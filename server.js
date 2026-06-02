const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json()); // Agar API bisa membaca data format JSON

app.get('/', (req, res) => {
    res.json({ message: "Welcome to News API Backend by Miftah & Adif" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});