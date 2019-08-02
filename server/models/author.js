'use strict';
module.exports = function(sequelize, DataTypes) {
  //Define the Author model
  //these below tree lines added by me. Sequelize not understand because of versyon problem.
var Author = sequelize.define('Author', { name: DataTypes.STRING, bio: DataTypes.TEXT, }, { underscored: true});
Author.associate = function(models) { Author.hasMany(models.Book,{foreingKey:'id'} ,{ onDelete: 'cascade' }) };
return Author;
};