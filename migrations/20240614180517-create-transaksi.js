'use strict';
/** @type {import('sequelize-cli').Migration} */
'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transaksi', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users', // Pastikan model Sequelize untuk User adalah 'User' (bukan 'Users')
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      jumlah_kantong: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      kantong_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'kantong', // Pastikan model Sequelize untuk Kantong adalah 'Kantong' (bukan 'Kantongs')
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      sampah_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'sampah', // Pastikan model Sequelize untuk Sampah adalah 'Sampah' (bukan 'Sampahs')
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('transaksi');
  }
};
