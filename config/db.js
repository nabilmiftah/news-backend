const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

// Mengambil variabel dari file .env
const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, 
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false // Agar terminal tidak penuh dengan log SQL
    }
);

// Cek Koneksi Database
sequelize.authenticate()
    .then(() => console.log('[DATABASE] MySQL Connected successfully.'))
    .catch(err => console.error('[DATABASE] Error connecting to MySQL:', err));

module.exports = sequelize;