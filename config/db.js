const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, 
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false // Mematikan log query SQL mentah di terminal agar rapi
    }
);

// Fungsi untuk mengetes koneksi
sequelize.authenticate()
    .then(() => console.log('[DATABASE] Sukses terhubung ke MySQL (news_db).'))
    .catch(err => console.error('[DATABASE] Gagal koneksi ke MySQL:', err));

module.exports = sequelize;