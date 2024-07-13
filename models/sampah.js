'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sampah extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Sampah.init({
    jenis_sampah: DataTypes.STRING
  }, {
    tableName:'sampah',
    sequelize,
    modelName: 'Sampah',
  });

  Sampah.associate = function(models) {
    // Definisikan asosiasi ke Transaksi
    Sampah.hasMany(models.Transaksi, {
      foreignKey: 'sampah_id',
      as: 'transaksi' // Nama asosiasi, bisa disesuaikan
    });
  };

  return Sampah;
};