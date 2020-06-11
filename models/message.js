'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    message: DataTypes.TEXT,
    author: DataTypes.STRING
  }, {});
  Message.associate = function(models) {
    Message.belongsTo(models.User);
    // associations can be defined here
  };
  return Message;
};