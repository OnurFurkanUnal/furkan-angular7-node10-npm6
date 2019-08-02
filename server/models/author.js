'use strict';
module.exports = function(sequelize, DataTypes) {
  //Define the Author model
  //alttaki 3 satır sonradan ekledim sequelize versyon probleminden anlamıyor.
var Author = sequelize.define('Author', { name: DataTypes.STRING, bio: DataTypes.TEXT, }, { underscored: true});
Author.associate = function(models) { Author.hasMany(models.Book,{foreingKey:'id'} ,{ onDelete: 'cascade' }) };
return Author;
};