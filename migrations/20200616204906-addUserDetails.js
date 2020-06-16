'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'Users',
        'email',
        {
          type : Sequelize.STRING,
          allowNull : false,
          defaultValue : "empty@email.com",
          validate : {
            isEmail : true
          }
        }
      ),
      queryInterface.addColumn(
        'Users',
        'age',
        {
          type : Sequelize.INTEGER,
          defaultValue : 19,
          validate : {
            isInt : true
          }
        }
      )
    ])

    // return queryInterface.addColumn(
    //   'Users',
    //   'email',
    //   {
    //     type : Sequelize.STRING,
    //     allowNull : false,
    //     defaultValue : "empty@email.com",
    //     validate : {
    //       isInt : true
    //     }
    //   }
    // ).then((queryInterface, Sequelize)=>{
    //   return queryInterface.addColumn(
    //     'Users',
    //     'age',
    //     {
    //       type : Sequelize.INTEGER,
    //       allowNull : false,
    //       defaultValue : 19,
    //       validate : {
    //         isInt : true,
    //       }
    //     }
    //   )
    // })
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(
        'Users',
        'email'
      ),
      queryInterface.removeColumn(
        'Users',
        'age'
      )
    ])
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
