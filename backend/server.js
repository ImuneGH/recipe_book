import express from "express";
import sqlite3 from "sqlite3";
import multer from "multer";
import cors from "cors";
import path, { resolve } from "path";
import sharp from "sharp";
import fs from "fs";
import { unlink } from "fs/promises";
import { error } from "console";
import { fileURLToPath } from "url";
import { app as electronApp } from "electron";

const app = express();
const PORT = process.env.PORT || 5000;
const isDev = !app.isPackaged;

function initializeDatabase() {
  const createSQLiteTable = `CREATE TABLE IF NOT EXISTS "recipes" (
	"ID"	integer,
	"createdAt"	text NOT NULL,
	"recipeName"	TEXT NOT NULL,
	"ingredients"	TEXT NOT NULL,
	"instructions"	TEXT NOT NULL,
	"category"	TEXT NOT NULL,
	"cookTime"	TEXT NOT NULL,
	"author"	TEXT,
	"imgPath"	TEXT,
	"updatedAt"	TEXT,
	PRIMARY KEY("ID" AUTOINCREMENT)
);`;

  db.run(createSQLiteTable, (err) => {
    if (err) {
      console.log("Chyba při tvorbě tabulky: ", err);
    } else {
      console.log("Tabulka recipes ok 👌");
    }
  });
}

const imgResize = async (originalImgPath, resizedImgPath) => {
  try {
    const buffer = await fs.promises.readFile(originalImgPath); // uloží se do proměnné, aby se nemusel používat disk, který obrázek lockne
    await sharp(buffer).resize(200).toFile(resizedImgPath);
    await fs.promises.unlink(originalImgPath);
    return resizedImgPath;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Middleware

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors()); // propojení backend, frontend
app.use(express.json()); // Pro práci s JSON daty (kdyby náhodou)
app.use(express.urlencoded({ extended: true }));

const fileValidation = (file) => {
  const MAX_LENGTH = 100;
  const fileCheck = /^[a-zA-Z0-9_-]+\.(jpg|jpeg|png)$/i;
  return file.length <= MAX_LENGTH && fileCheck.test(file);
};

const userDataPath = electronApp.getPath("userData");
const uploadsPath = path.join(userDataPath, "uploads");

// endpoint pro statické soubory

app.use("/uploads", express.static(uploadsPath));

// kontroluje jestli existuje cesta ke složce uploadsPath
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsPath);
  },
  filename: (req, file, cb) => {
    const nameFromFE = req.body.imgPath;
    let finalName = null;
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      if (nameFromFE && fileValidation(nameFromFE)) {
        finalName = nameFromFE;
        req.finalName = finalName;
        cb(null, finalName);
      } else {
        finalName = Date.now() + path.extname(file.originalname);
        req.finalName = finalName;
        cb(null, finalName);
      }
    } else {
      cb(new Error("Nepovolený typ souboru!"), false);
    }
  },
});

const upload = multer({ storage });

// Připojení k databázi

const dbPath = path.join(userDataPath, "database.db");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Chyba připojení k DB:", err.message);
  } else {
    console.log("✅ Připojeno k databázi SQLite");
    initializeDatabase();
  }
});

// GET requesty (z databáze přetvoří tabulku recipes v json)

app.get("/recipes", (req, res) => {
  db.all("SELECT * FROM recipes", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// POST requesty (vložení dat do tabulky recipes)

app.post("/recipes", upload.single("image"), async (req, res) => {
  const { createdAt, recipeName, ingredients, instructions, category, cookTime, author } = req.body;

  if (!createdAt || !recipeName || !ingredients || !instructions || !category || !cookTime) {
    return res.status(400).json({ error: "Vyplňte všechny povinné pole!" });
  }

  const SQL = `INSERT INTO recipes (createdAt, recipeName, ingredients, instructions, category, cookTime, author, imgPath)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  let resizedImgPath = null;
  let resizedImgDBPath = null;

  if (req.file) {
    const originalImgPath = path.join(uploadsPath, req.finalName);
    const resizedImage = "resized_" + req.finalName;
    resizedImgDBPath = "uploads/" + resizedImage;
    resizedImgPath = path.join(uploadsPath, resizedImage);

    await imgResize(originalImgPath, resizedImgPath);
  }

  db.run(SQL, [createdAt, recipeName, ingredients, instructions, category, cookTime, author, resizedImgDBPath], function (err) {
    if (err) {
      console.error("Chyba při ukládání dat do DB");
      res.status(500).json({ error: err.message });
    }
    console.log("Recept uložen: " + this.lastID);
    res.status(201).json({
      message: "Recept úspěšně uložen 🥳",
      id: this.lastID,
    });
  });
});

// DELETE requesty (smaže záznam receptu z tabulky recipes)

app.delete("/recipes/:id", async (req, res) => {
  const recipeID = parseInt(req.params.id, 10);

  try {
    const imgPath = await new Promise((resolve, reject) => {
      db.get("SELECT imgPath FROM recipes where ID = ?", [recipeID], (err, row) => {
        if (err) {
          console.error("Chyba při hledání receptu: ", err.message);
          return reject(newError("Chyba čtení z DB", err));
        }
        if (!row) {
          return reject(newError("Recept nenalezen", err));
        }
        resolve(row.imgPath);
      });
    });

    if (imgPath) {
      await unlink(imgPath);
    }

    await new Promise((resolve, reject) => {
      db.run("DELETE FROM recipes WHERE id = ?", [recipeID], (err) => {
        if (err) {
          console.error("Chyba při mazání z DB: ", err.message);
          return reject(err);
        }
        resolve();
      });
    });
    res.status(200).json({ message: "Recept úspěšně smazán." });
  } catch (err) {
    console.error("Chyba při mazání receptu", err.message);
    res.status(500).json({ error: err.message });
  }
});

// UPDATE requesty

app.put("/recipes/:id", upload.single("image"), (req, res) => {
  const { updatedAt, recipeName, ingredients, instructions, category, cookTime, author } = req.body;
  let resizedImgPath = null;
  let resizedImgDBPath = null;
  const recipeID = parseInt(req.params.id, 10);

  if (!updatedAt || !recipeName || !ingredients || !instructions || !category || !cookTime) {
    return res.status(400).json({ error: "Vyplňte všechny povinné pole!" });
  }

  const newImgName = req.file ? req.file.filename : null;

  if (newImgName) {
    db.get("SELECT imgPath FROM recipes WHERE ID = ?", [recipeID], (err, row) => {
      if (err) {
        return res.status(500).json({ error: "Chyba při načítání původního obrázku" });
      }
      if (row?.imgPath) {
        const oldPath = path.join(__dirname, row.imgPath);
        fs.unlink(oldPath, () => {
          if (err) {
            console.error("Chyba při mazání původního obrázku: ", err.message);
          } else {
            console.log("Původní obrázek úspěšně smazán!");
          }
        });
      }
      updateRecipe(newImgName);
    });
  } else {
    updateRecipe();
  }

  function updateRecipe(imgName) {
    if (req.file) {
      const originalImgPath = path.join(uploadsPath, req.finalName);
      const resizedImage = "resized_" + req.finalName;
      resizedImgDBPath = "uploads/" + resizedImage;
      resizedImgPath = path.join(uploadsPath, resizedImage);
      imgResize(originalImgPath, resizedImgPath);
    }

    const SQL = `UPDATE recipes SET updatedAt = ?, recipeName = ?, ingredients = ?, instructions = ?, category = ?, cookTime = ?, author = ? ${imgName ? ",imgPath = ?" : ""} WHERE ID = ?`;

    const params = imgName
      ? [updatedAt, recipeName, ingredients, instructions, category, cookTime, author, resizedImgDBPath, recipeID]
      : [updatedAt, recipeName, ingredients, instructions, category, cookTime, author, recipeID];

    db.run(SQL, params, (err) => {
      if (err) {
        return res.status(500).json({ error: "Chyba při ukládání." + err.message });
      }
      res.status(201).json({
        message: "Recept upraven 🥳",
      });
    });
  }
});

// error handler

app.use((err, req, res, next) => {
  console.error("Zachyceno globálním error handlerem:", err.message);
  res.status(400).json({ error: err.message });
});

// Spuštění serveru
app.listen(PORT, () => {
  console.log(`🚀 Server běží na http://localhost:${PORT}`);
});

export default app;
