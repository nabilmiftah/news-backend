const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware'); // 1. Impor middleware protect

// Jalur yang sudah ada sebelumnya
router.post('/register', authController.register);
router.post('/login', authController.login);

// 2. JALUR BARU UNTUK TES: GET http://localhost:5000/api/auth/profile
// Rute ini diproteksi oleh middleware 'protect'
router.get('/profile', protect, (req, res) => {
    res.json({
        message: "Ssshhh... Ini adalah halaman profil rahasia!",
        user: req.user // Menampilkan data user yang sedang login
    });
});

module.exports = router;