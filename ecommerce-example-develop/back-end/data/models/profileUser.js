const express = require('express');
const multer = require('multer');
const path = require('path');
const mysql = require('mysql');
const fs = require('fs');

const app = express();

// Configurações do multer para armazenar imagens localmente
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // Diretório onde as imagens serão armazenadas
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.use(express.json());

// Rota para upload de imagens
app.post('/api/upload', upload.single('image'), (req, res) => {
  const userId = req.body.userId;
  const imagePath = `/uploads/${req.file.filename}`;

  // Atualiza o caminho da imagem no banco de dados
  const query = 'UPDATE users SET profile_picture = ? WHERE id = ?';
  db.query(query, [imagePath, userId], (err, result) => {
    if (err) {
      return res.json({ success: false, message: 'Database update failed' });
    }
    res.json({ success: true, imageUrl: imagePath });
  });
});

// Rota para atualizar o perfil do usuário
app.post('/api/user/update/:id', (req, res) => {
  const { username, email, profilePicture } = req.body;
  const userId = req.params.id;

  const query = 'UPDATE users SET username = ?, email = ?, profile_picture = ? WHERE id = ?';
  db.query(query, [username, email, profilePicture, userId], (err, result) => {
    if (err) {
      return res.json({ success: false, message: 'Database update failed' });
    }
    res.json({ success: true });
  });
});

