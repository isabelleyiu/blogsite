'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    comment: DataTypes.STRING
  }, {});
  Comment.associate = function(models) {
    // associations can be defined here
    // disallow comment to be created withour a foreign key 
    Comment.belongsTo(models.Article, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Comment;
};