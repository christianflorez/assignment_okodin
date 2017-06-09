'use strict';
const models = require('../models');
const config = require('./seeding-config');
const MIN_SEEDS = config.minimum;
const genders = config.genders;
const maritalState = config.maritalState;
const minHeight = config.minHeight;
const maxHeight = config.maxHeight;
const minAge = config.minAge;
const maxAge = config.maxAge;
const bodyTypes = config.bodyTypes;
const lorem = require('lorem-ipsum');

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
    let profiles = [];

    for (let i = 0; i < MIN_SEEDS; i++) {
      profiles.push({
        userId: i + 1,
        aboutMe: lorem({
              count: 3,
              units: 'sentences' 
            }),
        talents: lorem({
              count: 3,
              units: 'sentences' 
            }),
        favorites: lorem({
              count: 3,
              units: 'sentences' 
            }),
        whyMessage: lorem({
              count: 3,
              units: 'sentences' 
            }),
        gender: genders[i % genders.length],
        age: Math.floor(Math.random() * (maxAge - minAge)) + minAge,
        maritalStatus: maritalState[i % maritalState.length],
        height: Math.floor(Math.random() * (maxHeight - minHeight)) + minHeight,
        bodyType: bodyTypes[i % bodyTypes.length],
        kids: i % 2 === 0,
        occupation: lorem({
              count: 1,
              units: 'sentences' 
            }),
        locationId: i + 1
      });
    }

    return queryInterface.bulkInsert('Profiles', profiles);
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Profiles', null, {}, models.Profile);
  }
};
