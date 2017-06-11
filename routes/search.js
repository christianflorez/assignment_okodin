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
  let city;
  let nearbyLocations;
  let search = req.query.search;

  // default search if user has not provided any queries
  if (Object.keys(req.query).length === 0) {

    sequelize.transaction(t => {
      // find current user's city
      return User.findById(req.session.currentUser.id, {
        include: [{
          all: true,
          include: [{ all: true }]
        }],
        transaction: t
      })
      .then(user => {
        // find all location ids with user's current city
        city = user.Profile.Location.cityId;
        return Location.findAll({
          where: { 
            cityId: city,
            distance: { $lte: DEFAULT_DISTANCE }
          },
          transaction: t
        });
      })
      .then(locations => {
        // find all profiles with locations with user's current city
        nearbyLocations = locations.map(location => location.id);
        return Profile.findAll({
          where: { 
            locationId: nearbyLocations
          },
          include: [{
            all: true,
            include: [{ all: true }]
          }],
          transaction: t
        });
      })
      .then(profiles => {
        let cityName = profiles[0]["Location"]["City"].name;
        res.render('search/index', { 
          profiles,
          cityName,
          distance: DEFAULT_DISTANCE
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

/* --------------------------
    PATH FOR CUSTOM QUERY
--------------------------- */

  // run custom query if user runs search
} else {
  let searchCity;
  let distance;
  let minAge = search.profile.minAge || 18;
  let maxAge = search.profile.maxAge || 100;

  sequelize.transaction(t => {
    return City.findOne({
      where: {
        name: search.location.city || 9999999
      },
      transaction: t
    })
      .then(city => {
        if (city) {
          searchCity = city.id;
        }
        return User.findById(req.session.currentUser.id, {
          include: [{
            all: true,
            include: [{ 
              all: true,
              include: [{ all: true}]
            }]
          }],
          transaction: t
        });
      })
      .then(user => {
        // find all location ids with searched city or
        // current user's city if they did not specify
        city = searchCity || user.Profile.Location.cityId;
        console.log(user.Profile.Location.City.name);
        distance = search.location.distance || DEFAULT_DISTANCE;
        return Location.findAll({
          where: { 
            cityId: city,
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
  }
});

module.exports = router;