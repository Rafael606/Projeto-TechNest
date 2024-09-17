'use strict';

const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const saltRounds = 10;

    // Inserir os usuários com senhas criptografadas
    const users = await queryInterface.bulkInsert('Users', [
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
    ], { returning: ['id'] });

    // Inserir os endereços associados aos usuários
    await queryInterface.bulkInsert('Enderecos', [
      {
        logradouro: 'Rua A, 123',
        cidade: 'Cidade A',
        uf: 'UF A',
        pais: 'Brasil',
        cep: '12345678',
        userId: users[0].id, // Associar o endereço ao primeiro usuário
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        logradouro: 'Rua B, 456',
        cidade: 'Cidade B',
        uf: 'UF B',
        pais: 'Brasil',
        cep: '23456789',
        userId: users[1].id, // Associar o endereço ao segundo usuário
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        logradouro: 'Rua C, 789',
        cidade: 'Cidade C',
        uf: 'UF C',
        pais: 'Brasil',
        cep: '34567890',
        userId: users[2].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        logradouro: 'Rua D, 1011',
        cidade: 'Cidade D',
        uf: 'UF D',
        pais: 'Brasil',
        cep: '45678901',
        userId: users[3].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        logradouro: 'Rua E, 1213',
        cidade: 'Cidade E',
        uf: 'UF E',
        pais: 'Brasil',
        cep: '56789012',
        userId: users[4].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        logradouro: 'Rua F, 1415',
        cidade: 'Cidade F',
        uf: 'UF F',
        pais: 'Brasil',
        cep: '67890123',
        userId: users[5].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        logradouro: 'Rua G, 1617',
        cidade: 'Cidade G',
        uf: 'UF G',
        pais: 'Brasil',
        cep: '78901234',
        userId: users[6].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        logradouro: 'Rua H, 1819',
        cidade: 'Cidade H',
        uf: 'UF H',
        pais: 'Brasil',
        cep: '89012345',
        userId: users[7].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        logradouro: 'Rua I, 2021',
        cidade: 'Cidade I',
        uf: 'UF I',
        pais: 'Brasil',
        cep: '90123456',
        userId: users[8].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        logradouro: 'Rua J, 2223',
        cidade: 'Cidade J',
        uf: 'UF J',
        pais: 'Brasil',
        cep: '01234567',
        userId: users[9].id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Enderecos', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  }
};
