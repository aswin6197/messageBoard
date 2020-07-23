'use strict';
const date = require('date-and-time');
const pattern = date.compile('MMM D YYYY h:m:s A');

module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    message: DataTypes.TEXT,
    author: DataTypes.STRING,
    topic : DataTypes.STRING,
    createdAt : {
      type : DataTypes.DATE,
      get() {
        let createdAt = this.getDataValue('createdAt');
        // return moment(date,format();
        return date.format(createdAt,pattern)
        // return this.getDataValue('createdAt');
      }
    }
  }, {});
  Message.associate = function(models) {
    Message.belongsTo(models.User);
    Message.belongsTo(models.Topic)
    // associations can be defined here
  };
  return Message;
};