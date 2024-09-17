'use strict';

const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const saltRounds = 10;

    // Inserir os usuários com senhas criptografadas
    await queryInterface.bulkInsert('Users', [
      {
        nome: 'Kristopher Robinson',
        email: 'kristopher@email.net',
        telefone: '662.194.4901',
        password: await bcrypt.hash('123456', saltRounds),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Matthew Moore',
        email: 'ortizerin@west.com',
        telefone: '842-614-3747x1347',
        password: await bcrypt.hash('123456', saltRounds),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Maria Garcia',
        email: 'ryansamuel@schmidt-robinson.com',
        telefone: '001-471-096-2158x247',
        password: await bcrypt.hash('123456', saltRounds),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Alexis Cooper',
        email: 'trivera@gates.com',
        telefone: '484.547.6083x162',
        password: await bcrypt.hash('123456', saltRounds),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Joshua Blankenship',
        email: 'williamevans@sweeney.info',
        telefone: '+1-013-993-6084x34876',
        password: await bcrypt.hash('123456', saltRounds),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Robert Boyd',
        email: 'blankenshipmatthew@hall.com',
        telefone: '240-544-3625',
        password: await bcrypt.hash('123456', saltRounds),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Ian Nelson',
        email: 'linda92@hansen.info',
        telefone: '(512)868-8293',
        password: await bcrypt.hash('123456', saltRounds),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Christopher Robles',
        email: 'calvin67@sanchez.info',
        telefone: '(315)699-6205',
        password: await bcrypt.hash('123456', saltRounds),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Kimberly Crawford',
        email: 'perezrichard@yahoo.com',
        telefone: '324.059.6463',
        password: await bcrypt.hash('123456', saltRounds),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Ryan Ingram',
        email: 'jackgrimes@gmail.com',
        telefone: '+1-843-063-9492x433',
        password: await bcrypt.hash('123456', saltRounds),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', {}, {});
  }
};
