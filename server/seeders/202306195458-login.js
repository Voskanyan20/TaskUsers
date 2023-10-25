'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('user', [
      {
        id: 10000,
        firstName: "harut",
        lastName: "Poghosyan",
        file: "????"
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op
    return await queryInterface.bulkDelete(
      'user',
      {
        id: {
          [Op.in]: [10000]
        }
      },
      {}
    )
  }
}
