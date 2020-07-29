'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return(
      queryInterface.addColumn(
        'Messages',
        'image',
        {
          type : Sequelize.STRING,
          defaultValue : null,
        }
      )
    )
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface, Sequelize) => {
    return(
      queryInterface.removeColumn(
        'Messages',
        'image'
      )
    )
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
