'use strict';
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    id : {
      type : DataTypes.INTEGER,
      primaryKey : true,
      autoIncrement : true
    },
    password: {
      type : DataTypes.STRING,
      set (passwd){
        let final = bcrypt.hashSync(passwd,bcrypt.genSaltSync(),null);
        this.setDataValue('password',final);
      }
    },
    email : {
      type : DataTypes.STRING,
      allowNull : false,
      defaultValue : "empty@email.com",
      validate : {
        isEmail : true
      }
    },
    age : {
      type : DataTypes.INTEGER,
      defaultValue : 19,
      validate : {
        isInt : true
      }
    }
  }, {instanceMethods : {
      validatePasswor : function(password){
        return bcrypt.compareSync(password,this.password);
      }
    }
  });
  User.associate = function(models) {
    User.hasMany(models.Message);
    // associations can be defined here
  };
  User.prototype.validatePassword = function(password){
    return bcrypt.compareSync(password,this.password);
  }
  return User;
};