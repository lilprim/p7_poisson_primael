"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		static associate(models) {
			// define association here
			models.User.hasMany(models.Post, { onDelete: "cascade", hooks: true });
			models.User.hasMany(models.Comment, { onDelete: "cascade", hooks: true });
			models.User.hasMany(models.Like, { onDelete: "cascade", hooks: true });
		}
	}
	User.init(
		{
		email: DataTypes.STRING,
		username: DataTypes.STRING,
		password: DataTypes.STRING,
		avatar: DataTypes.STRING,
		bio: DataTypes.TEXT,
		isAdmin: DataTypes.BOOLEAN,
		},
		{
		sequelize,
		modelName: "User",
		}
	);
	return User;
};