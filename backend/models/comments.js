'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    tableName: 'Comments',
  });

  Comment.associate = (models) => {
    Comment.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
    Comment.belongsTo(models.Post, { foreignKey: 'postId', onDelete: 'CASCADE' });
  };

  return Comment;
};
