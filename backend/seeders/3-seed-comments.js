"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
		return queryInterface.bulkInsert("Comments", [
			{
				UserId: "3",
				PostId: "1",
				content: "Merci",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				UserId: "2",
				PostId: "1",
				content: "Sympa !!!",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				UserId: "2",
				PostId: "3",
				content: "Good to know",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				UserId: "1",
				PostId: "3",
				content: "Merci pour ces informations",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				UserId: "3",
				PostId: "3",
				content: "Je pense en effet que ca peut être utile",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	down: async (queryInterface, Sequelize) => {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		return queryInterface.bulkDelete("Comments", null, {});
	},
};