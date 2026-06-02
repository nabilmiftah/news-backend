const Article = require('../models/articleModel');

// 1. Create Article
exports.createArticle = async (req, res) => {
    try {
        const { title, content, category_id } = req.body;
        // user_id ditarik dari JWT token (req.user di-set oleh middleware Miftah)
        const user_id = req.user?.id || 1; 

        if (!title || !content || !category_id) {
            return res.status(400).json({ message: "Semua field harus diisi!" });
        }

        const newArticle = await Article.create({ title, content, category_id, user_id });
        res.status(201).json({ message: "Artikel berhasil dibuat!", data: newArticle });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 2. Read All Articles
exports.getAllArticles = async (req, res) => {
    try {
        const articles = await Article.findAll();
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 3. Read Detail Article By ID
exports.getArticleById = async (req, res) => {
    try {
        const article = await Article.findByPk(req.params.id);
        if (!article) return res.status(404).json({ message: "Artikel tidak ditemukan" });
        res.status(200).json(article);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 4. Update Article
exports.updateArticle = async (req, res) => {
    try {
        const { title, content, category_id } = req.body;
        const article = await Article.findByPk(req.params.id);
        if (!article) return res.status(404).json({ message: "Artikel tidak ditemukan" });

        await article.update({ title, content, category_id });
        res.status(200).json({ message: "Artikel berhasil diperbarui!", data: article });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 5. Delete Article
exports.deleteArticle = async (req, res) => {
    try {
        const article = await Article.findByPk(req.params.id);
        if (!article) return res.status(404).json({ message: "Artikel tidak ditemukan" });

        await article.destroy();
        res.status(200).json({ message: "Artikel berhasil dihapus!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};