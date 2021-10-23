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
		return queryInterface.bulkInsert("Users", [
			{
				id: "1",
				username: "Admin",
				email: "admin@gmail.com",
				password:
					"$2b$10$Q.WiejLNsoDTWxm.9Z77C.zF36NELnpkwDcl87SZO3QZewHpff9ky",
				avatar: "http://localhost:3000/images/avatar1.png",
				isAdmin: true,
				bio: "Administrateur de Groupomania",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: "2",
				username: "John",
				email: "john@gmail.com",
				password:
					"$2b$10$Q.WiejLNsoDTWxm.9Z77C.zF36NELnpkwDcl87SZO3QZewHpff9ky",
				avatar: "http://localhost:3000/images/avatar3.png",
				isAdmin: false,
				bio: "Veuillez compléter votre profil...",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: "3",
				username: "Pierre",
				email: "pierre@gmail.com",
				password:
					"$2b$10$Q.WiejLNsoDTWxm.9Z77C.zF36NELnpkwDcl87SZO3QZewHpff9ky",
				avatar: "http://localhost:3000/images/avatar3.png",
				isAdmin: false,
				bio: "Veuillez compléter votre profil...",
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
		return queryInterface.bulkDelete("Users", null, {});
	},
};