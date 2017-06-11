const url = require('url');
const express = require('express');
const router = express.Router();
const models = require('./../models');
const sequelize = models.sequelize;
const User = models.User;
const Profile = models.Profile;
const Location = models.Location;
const City = models.City;
const DEFAULT_DISTANCE = 75;
const h = require('./../helpers/path-helpers').registered;
const { parseSearch } = require('./../helpers/search-helpers');

router.get('/', (req, res) => {
  let nearbyLocations;
  let search = req.query.search;
  let searchCity;
  let userCity;
  let distance;
  let minAge = search ? search.profile.minAge : 18;
  let maxAge = search ? search.profile.maxAge : 100;

  sequelize.transaction(t => {
    // first retrieves our user
    return User.findById(req.session.currentUser.id, {
      include: [{
        all: true,
        include: [{ 
          all: true
        }]
      }],
      transaction: t
    })
    .then(user => {
      // stores our user's cityId
      userCity = user.Profile.Location.cityId;

      // if there was a search, look up the city
      if (search) {
        return City.findOne({
          where: {
            name: search.location.city
          },
          transaction: t
        });
      } else {
        return Promise.resolve();
      }
    })
    .then(city => {
      if (!city && search) {
        req.flash('error', 'Error: City could not be found');
      }
      // either we found something, or default to user's city
      searchCity = city ? city.id : userCity;
      if (search) {
        distance = search.location.distance || DEFAULT_DISTANCE;
      } else {
        distance = DEFAULT_DISTANCE;
      }
      return Location.findAll({
        where: { 
          cityId: searchCity,
          distance: { $lte: distance }
        },
        include: [{ model: City }],
        transaction: t
      });
    })
    .then(locations => {
      // find all profiles with locations with searched city
      nearbyLocations = locations.map(location => location.id);
      let searchParams = parseSearch(search, nearbyLocations);

      return Profile.findAll({
        where: searchParams,
        include: [{
          all: true,
          include: [{ all: true }]
        }],
        transaction: t
      });
    })
    .then(profiles => {
      let cityName;
      if (profiles.length > 0) {
        cityName = profiles[0]["Location"]["City"].name;
      } else {
        cityName = search.location.city;
      }
      res.render('search/index', { 
        profiles,
        distance,
        cityName,
        minAge,
        maxAge
      });
    })
    .catch(e => {
      if (e.errors) {
        e.errors.forEach((err) => req.flash('error', err.message));
        res.redirect('back');
      } else {
        res.status(500).send(e.stack);
      }
    });
  });
});

module.exports = router;