// něco jako importy
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // propojení backend, frontend
app.use(express.json()); // Pro práci s JSON daty

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
app.post("/recipes", (req, res) => {
  const { recipeName, ingredients, instructions } = req.body;
  if (!nazev || !popis) {
    return res.status(400).json({ error: "Vyplňte všechna pole!" });
  }

  db.run("INSERT INTO recipes (createdAt, recipeName, ingredients, instructions, category, cookTime, author, imgPath) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [recipeName, ingredients, instructions, category, cookTime, author, imgPath], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: this.lastID, recipeName, ingredients, instructions });
  });
});

// Spuštění serveru
app.listen(PORT, () => {
  console.log(`🚀 Server běží na http://localhost:${PORT}`);
});