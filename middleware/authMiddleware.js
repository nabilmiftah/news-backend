const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = async (req, res, next) => {
    let token;

    // Token biasanya dikirim di dalam Header HTTP bagian 'Authorization' dengan format: Bearer <token>
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Mengambil token asli (memisahkan kata 'Bearer' dengan 'string_token')
            token = req.headers.authorization.split(' ')[1];

            // Verifikasi token menggunakan JWT_SECRET yang ada di file .env
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Ambil data user dari database berdasarkan ID di token (tanpa membawa password)
            req.user = await User.findByPk(decoded.id, {
                attributes: { exclude: ['password'] }
            });

            // Jika lolos, izinkan Express lanjut ke fungsi controller berikutnya
            next();
        } catch (error) {
            console.error(error);
            return res.status(401).json({ message: 'Akses ditolak, token tidak valid atau kedaluwarsa!' });
        }
    }

    // Jika di header tidak ada token sama sekali
    if (!token) {
        return res.status(401).json({ message: 'Akses ditolak, token tidak ditemukan!' });
    }
};

module.exports = { protect };