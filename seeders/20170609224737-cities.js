'use strict';
const models = require('../models');
const cityNames = require('country-city').getCities("Norway");
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
    let cities = [];
    cityNames.forEach(name => {
      cities.push({
        name: name
      });
    });

    return queryInterface.bulkInsert('Cities', cities);
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Cities', null, {}, models.City);
  }
};
