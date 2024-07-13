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
    await queryInterface.bulkInsert('sampah', [
      {
       jenis_sampah: 'Plastik',
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
      jenis_sampah: 'Metal',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      jenis_sampah: 'Kardus',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      jenis_sampah: 'Kertas',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      jenis_sampah: 'Kaca',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    ], {});
  
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
