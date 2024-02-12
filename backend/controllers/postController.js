// controllers/postController.js
const { Post, User, Comment } = require('../models');

// Create a new post
const createPost = async (req, res) => {
  try {
    const { content, imageUrl } = req.body;
    const userId = req.user.id; // Assuming userId is extracted from the JWT token

    // Fetch the user object
    const user = await User.findByPk(userId);

    // Debugging: Log the user object to inspect its structure
    console.log('User object:', user);

    // Check if the user object and email property exist
    if (!user || !user.email) {
      return res.status(400).json({ message: 'User email not found' });
    }

    // Create the new post with the user's email
    const newPost = await Post.create({
      content,
      imageUrl,
      userId,
    });

    // Return the post data along with the user's email
    res.status(201).json({ message: 'Post created successfully', post: { ...newPost.toJSON(), userEmail: user.email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating post' });
  }
};


// Get all posts with user emails
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [{ model: User, attributes: ['email'] }]
    });

    console.log('Fetched posts:', posts);
    res.status(200).json({ posts });
  } catch (error) {
    console.error('Error fetching posts', error);
    res.status(500).json({ message: 'Error fetching posts' });
  }
};

module.exports = { createPost, getAllPosts };
