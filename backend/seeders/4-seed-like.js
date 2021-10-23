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
		return queryInterface.bulkInsert("Likes", [
			{
				UserId: "1",
				PostId: "2",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				UserId: "1",
				PostId: "3",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				UserId: "2",
				PostId: "1",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				UserId: "2",
				PostId: "2",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				UserId: "2",
				PostId: "3",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				UserId: "3",
				PostId: "2",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				UserId: "3",
				PostId: "3",
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
		return queryInterface.bulkDelete("Likes", null, {});
	},
};