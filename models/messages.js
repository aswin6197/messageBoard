'use strict';
module.exports = (sequelize, DataTypes) => {
  const messages = sequelize.define('messages', {
    name: {
      type : DataTypes.STRING,
      allowNull : false
    },
    message:{
      type : DataTypes.TEXT,
      allowNull : false
    } 
  }, {});
  messages.associate = function(models) {
    // associations can be defined here
  };
  return messages;
};