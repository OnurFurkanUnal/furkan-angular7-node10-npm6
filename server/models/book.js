'use strict';
module.exports = (sequelize, DataTypes) => {
  var Book = sequelize.define('Book', {
    name: DataTypes.STRING,
    isbn: DataTypes.INTEGER,
    publication_date: DataTypes.DATE,
    description: DataTypes.TEXT,
    author_id: DataTypes.INTEGER//,
//    created_at:DataTypes.DATE, sonradan ekledim bu 2 yi
//    updated_at:DataTypes.DATE
  }, {
    underscored: true,
  });
  Book.associate = function(models) {
    // associations can be defined here
    Book.belongsTo(models.Author/*,{foreingKey:'id'} ,{ targetKey: 'author_id' }*/)
  };
  return Book;
};