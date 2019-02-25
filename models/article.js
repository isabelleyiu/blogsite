const Sequelize = require('sequelize');
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    }
  }, {});
  Article.associate = function(models) {
    // associations can be defined here
    Article.hasMany(models.Comment, {
      onDelete: 'cascade'
    });
  };
  return Article;
};