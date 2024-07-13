'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('kantong',[
    {
      jenis_kantong: 'Kecil',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
     jenis_kantong: 'Sedang',
     createdAt: new Date(),
     updatedAt: new Date()
   },
   {
     jenis_kantong: 'Besar',
     createdAt: new Date(),
     updatedAt: new Date()
   },
  ],{})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
