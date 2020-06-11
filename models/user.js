'use strict';
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    password: {
      type : DataTypes.STRING,
      set (passwd){
        let final = bcrypt.hashSync(passwd,bcrypt.genSaltSync(),null);
        this.setDataValue('password',final);
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