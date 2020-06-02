'use strict';
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    username: {
      type : DataTypes.STRING,
      allowNull : false,
      unique : true
    },
    password: {
      type : DataTypes.STRING,
      allowNull : false,
      set (passwd){
        let final = bcrypt.hashSync(passwd,bcrypt.genSaltSync(),null);
        this.setDataValue('password',final);
      }
    },
  }, {
    instanceMethods : {
      validatePasswor : function(password){
        return bcrypt.compareSync(password,this.password);
      }
    }
  });
  Users.associate = function(models) {
    // associations can be defined here
  };
  Users.prototype.validatePassword = function(password){
    return bcrypt.compareSync(password,this.password);
  }
  return Users;
};