const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.post('/', commentController.createComment);
router.get('/article/:articleId', commentController.getCommentsByArticle);
router.delete('/:id', commentController.deleteComment);

module.exports = router;