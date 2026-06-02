const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 1. FUNGSI REGISTER (PENDAFTARAN USER)
exports.register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        // Cek apakah email sudah terdaftar
        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            return res.status(400).json({ message: 'Email sudah terdaftar!' });
        }

        // TASK 4: ENKRIPSI PASSWORD MENGGUNAKAN BCRYPT
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Simpan ke database dengan password yang sudah di-hash
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            role
        });

        res.status(201).json({
            message: 'User berhasil didaftarkan!',
            user: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// 2. FUNGSI LOGIN (MASUK SISTEM)
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Cari user berdasarkan email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'Email atau Password salah!' });
        }

        // Bandingkan password yang diinput dengan password terenkripsi di DB
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Email atau Password salah!' });
        }

        // TASK 5: GENERATE JWT TOKEN JIKA LOGIN SUKSES
        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' } // Token berlaku selama 1 hari
        );

        res.status(200).json({
            message: 'Login berhasil!',
            token,
            user: {
                id: user.id,
                username: user.username,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};