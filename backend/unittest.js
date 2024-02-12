const { Sequelize, DataTypes } = require('sequelize');
const { User, Post, Comment } = require('./models'); // Adjust the path accordingly

// Define the Sequelize instance
const sequelize = new Sequelize('social_media_db', 'admin', 'admin', {
  host: 'localhost',
  dialect: 'postgres',
});

// Test the connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');

    // Test the models
    User.findAll()
      .then(users => {
        console.log('Users:', users.map(user => user.toJSON()));
      })
      .catch(error => console.error('Error querying Users:', error));

    Post.findAll()
      .then(posts => {
        console.log('Posts:', posts.map(post => post.toJSON()));
      })
      .catch(error => console.error('Error querying Posts:', error));

    Comment.findAll()
      .then(comments => {
        console.log('Comments:', comments.map(comment => comment.toJSON()));
      })
      .catch(error => console.error('Error querying Comments:', error));
  })
  .catch(error => {
    console.error('Unable to connect to the database:', error);
  });
