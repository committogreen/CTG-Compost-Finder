'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('smartBins', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
    //start of daraus code
    county: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    state: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    //end
      name: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING,
        allowNull: true
      },
      website: {
        type: Sequelize.STRING,
        allowNull: true
      },
      timeOpen: {
        type: Sequelize.STRING,
        allowNull: true
      },
      monthOpen: {
        type: Sequelize.STRING,
        allowNull: true
      },
      latitude: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      longitude: {
        type: Sequelize.FLOAT,
        allowNull: true
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('smartBins');
  }
};
