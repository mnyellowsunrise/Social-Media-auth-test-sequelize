// create-posts-table.js

const { Sequelize, DataTypes } = require('sequelize');

// Replace 'your-database-url' with the actual connection URL of your PostgreSQL database
const sequelize = new Sequelize('postgresql://admin:admin@127.0.0.1:5432/social_media_db', {
  dialect: 'postgres', // Specify the dialect explicitly
});

async function createPostsTable() {
  try {
    // Define the 'Post' model with the specified columns and options
    const Post = sequelize.define('Post', {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      imageUrl: {
        type: DataTypes.STRING,
      },
      upvotes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      downvotes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    });

    // Synchronize the model with the database to create the 'Post' table
    await Post.sync({ force: true });

    console.log('Post table created successfully!');
  } catch (error) {
    console.error('Error creating Post table:', error);
  } finally {
    // Close the Sequelize connection
    await sequelize.close();
  }
}

// Call the function to create the 'Post' table
createPostsTable();
