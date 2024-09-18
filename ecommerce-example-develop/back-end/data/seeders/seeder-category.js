'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    // Inserir as categorias principais
    await queryInterface.bulkInsert('Categories', [
      {
        nome: 'Computadores e Laptops',
        parentId: null, // Esta é a categoria principal, sem pai
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Componentes de Hardware',
        parentId: null, // Esta é a categoria principal, sem pai
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});

    // Recuperar a categoria inserida
    const parentCategory = await queryInterface.sequelize.query(
      `SELECT id FROM Categories WHERE nome = 'Computadores e Laptops'`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    await queryInterface.bulkInsert('Categories', [      
      {
        nome: 'Desktops',
        parentId: parentCategory[0].id, // ID da categoria 'Computadores e Laptops'
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Notebooks',
        parentId: parentCategory[0].id, // ID da categoria 'Computadores e Laptops'
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Ultrabooks',
        parentId: parentCategory[0].id, // ID da categoria 'Computadores e Laptops'
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'All-in-One',
        parentId: parentCategory[0].id, // ID da categoria 'Computadores e Laptops'
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

    const parentCategory2 = await queryInterface.sequelize.query(
      `SELECT id FROM Categories WHERE nome = 'Componentes de Hardware'`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    return queryInterface.bulkInsert('Categories', [      
      {
        nome: 'Processadores (CPUs)',
        parentId: parentCategory2[0].id, // ID da categoria 'Componentes de Hardware'
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Placas-mãe',
        parentId: parentCategory2[0].id, // ID da categoria 'Componentes de Hardware'
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Placas de Vídeo (GPUs)',
        parentId: parentCategory2[0].id, // ID da categoria 'Componentes de Hardware'
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Memória RAM',
        parentId: parentCategory2[0].id, // ID da categoria 'Componentes de Hardware'
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Armazenamento (HDDs, SSDs)',
        parentId: parentCategory2[0].id, // ID da categoria 'Componentes de Hardware'
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Fontes de Alimentação',
        parentId: parentCategory2[0].id, // ID da categoria 'Componentes de Hardware'
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Gabinetes',
        parentId: parentCategory2[0].id, // ID da categoria 'Componentes de Hardware'
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Coolers e Sistemas de Refrigeração',
        parentId: parentCategory2[0].id, // ID da categoria 'Componentes de Hardware'
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Realidade Virtual',
        parentId: parentCategory2[0].id, // ID da categoria 'Componentes de Hardware'
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    // Remover primeiro as subcategorias
    await queryInterface.bulkDelete('Categories', { parentId: { [Sequelize.Op.ne]: null } }, {});

    // Remover a categoria principal
    await queryInterface.bulkDelete('Categories', { parentId: null }, {});
  }
};
