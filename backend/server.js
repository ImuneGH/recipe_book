// něco jako importy
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const multer = require("multer");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // propojení backend, frontend
app.use(express.json()); // Pro práci s JSON daty (kdyby náhodou)
app.use(express.urlencoded({ extended: true }));

const fileValidation = (file) => {
  const MAX_LENGTH = 100;
  const fileCheck = /^[a-zA-Z0-9_-]+\.(jpg|jpeg|png)$/i;
  return file <= MAX_LENGTH && fileCheck.test(file);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    const nameFromFE = req.body.imgPath;
    let finalName = null;
    if(fileValidation(nameFromFE)) {
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
app.post("/recipes", upload.single("image"), (req, res) => {
  
  console.log("REQ BODY:", req.body);
  console.log("REQ FILE:", req.file);
  const { createdAt, recipeName, ingredients, instructions, category, cookTime, author } = req.body;
  let { imgPath } = req.body;
  const image = req.file;

  imgPath = req.finalName;
  console.log(imgPath);
  // if (!fileValidation(imgPath)) {
  //   imgPath = Date.now() + path.extname(file.originalname);
  //   console.log("Název byl upraven backendem na:", imgPath);
  // }

  if (!createdAt || !recipeName || !ingredients || !instructions || !category || !cookTime) {
    return res.status(400).json({ error: "Vyplňte všechny povinné pole!" });
  }

  const SQL = `INSERT INTO recipes (createdAt, recipeName, ingredients, instructions, category, cookTime, author, imgPath) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)`

  db.run(SQL, [createdAt, recipeName, ingredients, instructions, category, cookTime, author, imgPath], function (err) {
    if (err) {
      console.error("Chyba při ukládání dat do DB");
      res.status(500).json({ error: err.message });
    }
    console.log("Recept uložen: " + this.lastID);
    res.status(201).json({ message: "Recept úspěšně uložen 🥳", id: this.lastID });
  });
});

// Spuštění serveru
app.listen(PORT, () => {
  console.log(`🚀 Server běží na http://localhost:${PORT}`);
});