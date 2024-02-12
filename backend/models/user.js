'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    tableName: 'Users',
  });

  User.associate = (models) => {
    User.hasMany(models.Post, { foreignKey: 'userId', onDelete: 'CASCADE' });
    User.hasMany(models.Comment, { foreignKey: 'userId', onDelete: 'CASCADE' });
  };

  return User;
};
