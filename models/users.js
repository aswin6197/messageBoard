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
        const salt = bcrypt.genSalt();
        user.password = bcrypt.hash(user.password,salt);
      }
    },
    instanceMethods : {
      validatePassword(password){
        return bcrypt.compareSync(password,this.password);
      }
    }
  });
  Users.associate = function(models) {
    // associations can be defined here
  };
  return Users;
};