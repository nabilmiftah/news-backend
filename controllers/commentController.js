const Comment = require('../models/commentModel');

// 1. Create Comment
exports.createComment = async (req, res) => {
    try {
        const { comment_text, article_id } = req.body;
        const user_id = req.user?.id || 1;

        if (!comment_text || !article_id) {
            return res.status(400).json({ message: "Komentar dan article_id wajib diisi!" });
        }

        const newComment = await Comment.create({ comment_text, article_id, user_id });
        res.status(201).json({ message: "Komentar berhasil ditambahkan!", data: newComment });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 2. Get Comments by Article ID
exports.getCommentsByArticle = async (req, res) => {
    try {
        const comments = await Comment.findAll({ where: { article_id: req.params.articleId } });
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 3. Delete Comment
exports.deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findByPk(req.params.id);
        if (!comment) return res.status(404).json({ message: "Komentar tidak ditemukan" });

        await comment.destroy();
        res.status(200).json({ message: "Komentar berhasil dihapus!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};