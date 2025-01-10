const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000; // Ubah ke 3000 untuk lokal, atau biarkan kosong jika di Render
const DATA_FILE = "visitors.json";

// Middleware
app.use(express.json());
app.use(express.static(".")); 

// Endpoint untuk menambahkan pengunjung
app.post("/add-visitor", (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send("Nama diperlukan!");
  }

  let visitors = [];
  if (fs.existsSync(DATA_FILE)) {
    visitors = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  }

  visitors.push({ name });
  fs.writeFileSync(DATA_FILE, JSON.stringify(visitors, null, 2));

  res.send("Pengunjung berhasil ditambahkan!");
});

// Endpoint untuk mendapatkan daftar pengunjung
app.get("/get-visitors", (req, res) => {
  if (fs.existsSync(DATA_FILE)) {
    const visitors = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
    res.json(visitors);
  } else {
    res.json([]);
  }
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});