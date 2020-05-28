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
    },
  }, {
    hooks : {
      beforeCreate : (user) => {
        user.password = bcrypt.hashSync(user.password,bcrypt.genSaltSync(),null);
        // const salt = bcrypt.genSalt();
        // user.password = bcrypt.hash(user.password,salt);
      }
    },
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