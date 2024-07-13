'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Kantong extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Kantong.init({
    jenis_kantong: DataTypes.STRING
  }, {
    tableName:'kantong',
    sequelize,
    modelName:'Kantong',
  });

  Kantong.associate = function(models) {
    
    Kantong.hasMany(models.Transaksi, {
      foreignKey: 'kantong_id',
      as: 'transaksi' 
    });
  };
  return Kantong;
};