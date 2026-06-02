const express = require('express');
const dotenv = require('dotenv');
const db = require('./config/db'); // Mengimpor koneksi database
const User = require('./models/userModel'); // Mengimpor model User
const authRoutes = require('./routes/authRoutes')
dotenv.config();

const app = express();
app.use(express.json());

// Sinkronisasi Database (Membuat tabel otomatis jika belum ada)
db.sync({ force: false }) // force: false menjaga agar data lama tidak terhapus otomatis
    .then(() => console.log('[DATABASE] Semua tabel berhasil disinkronisasi.'))
    .catch(err => console.error('[DATABASE] Gagal sinkronisasi tabel:', err));

// Middleware Rute auth
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.json({ message: "Welcome to News API Backend - Database Connected!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`[SERVER] Running on port ${PORT}`);
});