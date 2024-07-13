'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Point extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Point.init({
    point: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0 // Default value untuk kolom points
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users', // Nama tabel user harus sesuai
        key: 'id'
      }
    }
  }, {
    tableName:'points',
    sequelize,
    modelName: 'Point',
  });

  Point.associate = function(models) {
    Point.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
  };
  return Point;
};