'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Profiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      aboutMe: {
        type: Sequelize.TEXT
      },
      talents: {
        type: Sequelize.TEXT
      },
      favorites: {
        type: Sequelize.TEXT
      },
      whyMessage: {
        type: Sequelize.TEXT
      },
      gender: {
        type: Sequelize.STRING
      },
      maritalStatus: {
        type: Sequelize.STRING
      },
      height: {
        type: Sequelize.INTEGER
      },
      bodyType: {
        type: Sequelize.STRING
      },
      kids: {
        type: Sequelize.BOOLEAN
      },
      occupation: {
        type: Sequelize.STRING
      },
      locationId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Profiles');
  }
};