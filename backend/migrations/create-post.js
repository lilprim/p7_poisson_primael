"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("Posts", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			UserId: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: { // permet de creer un post seulement si l'user existe //
					model: "Users",
					key: "id",
				},
				onDelete: "CASCADE",// suppression des posts si suppression de l'user//
			},
			title: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			content: {
				allowNull: false,
				type: Sequelize.TEXT,
			},
			attachment: {
				allowNull: true,
				type: Sequelize.STRING,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("Posts");
	},
};