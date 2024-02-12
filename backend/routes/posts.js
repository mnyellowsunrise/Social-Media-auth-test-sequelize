// backend/routes/posts.js

const express = require('express');
const router = express.Router();
const { createPost, getAllPosts } = require('../controllers/postController');
const authenticate = require('../middleware/authenticate');

// Create a new post (protected route)
router.post('/', authenticate, createPost);

// Fetch all posts (public route)
router.get('/', getAllPosts);

// Example protected route
router.get('/protected', authenticate, (req, res) => {
    res.json({ message: 'This route is protected and requires authentication.' });
});

module.exports = router;
