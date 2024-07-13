'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaksi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Transaksi.init({
    user_id: DataTypes.INTEGER,
    jumlah_kantong: DataTypes.INTEGER,
    kantong_id: DataTypes.INTEGER,
    sampah_id: DataTypes.INTEGER,
    transaksi_point: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName:'transaksi',
    sequelize,
    modelName: 'Transaksi',
  });

  Transaksi.associate = function(models) {
 
    Transaksi.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    });

  
    Transaksi.belongsTo(models.Kantong, {
      foreignKey: 'kantong_id',
      as: 'kantong'
    });

    
    Transaksi.belongsTo(models.Sampah, {
      foreignKey: 'sampah_id',
      as: 'sampah'
    });
  };
  return Transaksi;
};