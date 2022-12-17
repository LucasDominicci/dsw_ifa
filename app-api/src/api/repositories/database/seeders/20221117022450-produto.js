'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('produtos', [
      {
        id: 1,
        nome: "Pão",
        quantidade: 9999,
        categoria: 'Pães',
        preco: 2.10
      },
      {
        id: 2,
        nome: "Pão",
        quantidade: 9999,
        categoria: 'Pães',
        preco: 2.10
      },
      {
        id: 3,
        nome: "Pão",
        quantidade: 9999,
        categoria: 'Pães',
        preco: 2.10
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('produtos', null, {});
  }
};
