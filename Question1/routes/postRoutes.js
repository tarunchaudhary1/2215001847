const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.get('/', (req, res) => {
  if (req.query.type === 'popular') {
    postController.getPopularPosts(req, res);
  } else if (req.query.type === 'latest') {
    postController.getLatestPosts(req, res);
  } else {
    res.status(400).json({ message: 'Invalid type parameter' });
  }
});

module.exports = router;