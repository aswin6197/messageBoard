'use strict';
// const {
//   Model, Sequelize, DataTypes
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Topic extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//       Topic.hasMany(models.Messages);
//     }
//   };
//   Topic.init({
//     topicName: DataTypes.STRING,
//     id : {
//       type : DataTypes.INTEGER,
//       primaryKey : true
//     }
//   }, {
//     sequelize,
//     modelName: 'Topic',
//   });
//   return Topic;
// };


module.exports = (sequelize,DataTypes)=>{
  const Topic = sequelize.define('Topic',{
    topicName : DataTypes.STRING,
    id : {
      type : DataTypes.INTEGER,
      primaryKey : true
    },
    createdAt : DataTypes.DATE
  },{});
  Topic.associate = function(models){
    Topic.hasMany(models.Message)
  };
  return Topic;
};