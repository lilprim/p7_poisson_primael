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
		return queryInterface.bulkInsert("Posts", [
			{
				UserId: "1",
				title: "Bonjour !",
				content: "Bienvenue sur Groupomania",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				UserId: "2",
				title: "Hello, my name is John",
				content:
					"I'm so happy to be here !!!",
				attachment: "http://localhost:3000/images/happy.gif",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				UserId: "3",
				title: "Installer et configurer samba",
				content:
					"Le partage réseau a été développé par IBM en 1985 pour OS/2 et s'appelait alors LAN Manager. Il a ensuite été mis en avant par Microsoft sous le nom de SMB pour en faire un tout nouveau protocole de partage. Il a été appelé aussi CIFS (Common Internet File System ) entre 1998 et 2006, et a encore été renommé sous le nom de SMB2 pour la sortie de Windows Vista et conserve ce nom jusqu'à Windows 8.",
				attachment: "http://localhost:3000/images/samba.jpg",
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
		return queryInterface.bulkDelete("Posts", null, {});
	},
};