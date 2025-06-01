// něco jako importy
import express from "express";
import sqlite3 from "sqlite3";
import multer from "multer";
import cors from "cors";
import path from "path";
import sharp from "sharp";
import fs from "fs";
import dotenv from "dotenv";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // propojení backend, frontend
app.use(express.json()); // Pro práci s JSON daty (kdyby náhodou)
app.use(express.urlencoded({ extended: true }));

const fileValidation = (file) => {
  const MAX_LENGTH = 100;
  const fileCheck = /^[a-zA-Z0-9_-]+\.(jpg|jpeg|png)$/i;
  return file.length <= MAX_LENGTH && fileCheck.test(file);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    const nameFromFE = req.body.imgPath;
    const anotherName = file.originalname;
    console.log(nameFromFE);
    console.log(anotherName);
    let finalName = null;
    if(nameFromFE && fileValidation(nameFromFE)) {
      finalName = nameFromFE;
      req.finalName = finalName;
      cb(null, finalName);
    } else {
      finalName = Date.now() + path.extname(file.originalname);
      req.finalName = finalName;
      cb(null, finalName);
    };

  }
});

const upload = multer({ storage });

// Připojení k databázi
const db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    console.error("Chyba připojení k DB:", err.message);
  } else {
    console.log("✅ Připojeno k databázi SQLite");
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
  
  console.log("REQ BODY:", req.body);
  console.log("REQ FILE:", req.file);
  const { createdAt, recipeName, ingredients, instructions, category, cookTime, author } = req.body;
  let { imgPath } = req.body;
  const image = req.file;

  imgPath = req.finalName;
  const originalImgPath = path.join("uploads", imgPath);
  const resizedImage = "resized_" + imgPath;
  const resizedImgPath = path.join("uploads", resizedImage);
  // console.log(resizedImgPath);

  if (!createdAt || !recipeName || !ingredients || !instructions || !category || !cookTime) {
    return res.status(400).json({ error: "Vyplňte všechny povinné pole!" });
  }

  const SQL = `INSERT INTO recipes (createdAt, recipeName, ingredients, instructions, category, cookTime, author, imgPath) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)`

  try {
    const buffer = await fs.promises.readFile(originalImgPath);
    await sharp(buffer).clone().resize(200).toFile(resizedImgPath);
    const finalImgPath = resizedImgPath;
    // res.status(200).json({ message: "Obrázek zmenšen a uložen" });
    await fs.promises.unlink(originalImgPath);

    db.run(SQL, [createdAt, recipeName, ingredients, instructions, category, cookTime, author, finalImgPath], function (err) {
    if (err) {
      console.error("Chyba při ukládání dat do DB");
      res.status(500).json({ error: err.message });
    }
    console.log("Recept uložen: " + this.lastID);
    res.status(201).json({ message: "Recept úspěšně uložen 🥳", id: this.lastID });
  });
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Chyba při zpracování obrázku" });
  };
});

// Spuštění serveru
app.listen(PORT, () => {
  console.log(`🚀 Server běží na http://localhost:${PORT}`);
});