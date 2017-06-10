'use strict';
const models = require('../models');
const config = require('./seeding-config');
const MAX_CITIES = config.MAX_CITIES;
const MAX_DISTANCE = config.MAX_DISTANCE;
const MIN_SEEDS = config.MIN_SEEDS;

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    let locations = [];
    for (let i = 0; i < MIN_SEEDS; i++) {
      locations.push({
        cityId: Math.floor(Math.random() * MAX_CITIES),
        distance: Math.floor(Math.random() * MAX_DISTANCE)
      });
    }
    return queryInterface.bulkInsert('Locations', locations);
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Locations', null, {}, models.Location);
  }
};
