'use strict';
const {
  Model
} = require('sequelize');

const {
  hashPassword
} = require("../utils/bcrypt")

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    nama: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Required"
        },
        isEmail: {
          msg: "Format email tidak valid" // Pesan error jika format email tidak valid
        }
      }
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false, // Kolom tidak boleh kosong
      validate: {
         notEmpty: {
          args: true,
          msg: "Required"
        },
      }
    },
    no_telp: DataTypes.STRING,
    alamat: DataTypes.TEXT,
    detail_alamat: DataTypes.STRING
  }, {
    tableName:'users',
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user) => {
        const hashedPassword = hashPassword(user.password)

        user.password = hashedPassword
      }
    }
  });

  User.associate = function(models) {
    User.hasOne(models.Point, {
      foreignKey: 'userId',
      as: 'point'
    });

    User.hasMany(models.Transaksi, {
      foreignKey: 'user_id',
      as: 'transaksis'
    });
  };
  return User;
};