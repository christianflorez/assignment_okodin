const url = require('url');
const express = require('express');
const router = express.Router();
const models = require('./../models');
const sequelize = models.sequelize;
const User = models.User;
const Profile = models.Profile;
const Location = models.Location;
const City = models.City;
const View = models.View;
const h = require('./../helpers/path-helpers').registered;
const { parseParams } = require('./../helpers/profile-helpers');

router.get('/', (req, res) => {
  res.redirect('back');
});

router.get('/:id', (req, res) => {
  let canEdit;
  let profile;
  let currentUserId = req.session.currentUser.id;

  sequelize.transaction(t => {
    return Profile.findById(req.params.id, {
      include: [{
        all: true,
        include: [{ all: true }]
      }],
      transaction: t
    })
      .then(results => { 
        profile = results;
        if (profile) {
          // this is the currently logged in user's profile
          if (profile.User.id !== null && profile.User.id === currentUserId) {
            canEdit = true;
            return Promise.resolve();
          // this is another user, so create a new view
          } else if (profile.User.id !== null && profile.User.id !== currentUserId) {
            let viewParams = {
              viewerId: currentUserId,
              vieweeId: profile.User.id
            };
            return View.findOrCreate({
              defaults: viewParams,
              where: viewParams,
              transaction: t
            });
          }
        } else {
          res.status(404).send('404 Not Found');
          return Promise.reject();
        }
      })
      .then(() => {
        res.render('profiles/show', { profile, canEdit });
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

router.get('/:id/edit', (req, res) => {
  Profile.findById(req.params.id, {
    include: [{
      all: true,
      include: [{ all: true }]
    }]
  })
    .then(profile => { 
      if (profile.User.id === req.session.currentUser.id) {
        res.render('profiles/edit', { profile});
      } else {
        req.flash('error', 'Error: You cannot edit that user\'s profile');
        res.redirect('back');
      }
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

router.put('/:id', (req, res) => {
  let profileParams = parseParams(req.body.profile.details);
  let cityName = req.body.profile.location.city;
  let distance = req.body.profile.location.distance;
  let userId = req.session.currentUser.id;

  sequelize.transaction(t => {
    return Profile.findOrCreate({
      default: profileParams,
      where: { userId: userId },
      transaction: t
    })
    .spread(profile => {
      return Profile.update(profileParams, {
        where: { id: profile.id },
        transaction: t
      });
    })
    .then(() => {
      return City.findOrCreate({
        default: {
          name: cityName
        },
        where: { name: cityName},
        transaction: t
      });
    })
    .spread(city => {
      return Location.findOrCreate({
        default: {
          cityId: city.id,
          distance: req.body.profile.location.distance
        },
        where: { cityId: city.id, distance: distance},
        transaction: t
      });
    })
    .spread(location => {
      return Profile.update({locationId: location.id}, {
        where: {userId: userId},
        limit: 1,
        transaction: t
      });
    })
    .then(() => {
      res.redirect(h.profilePath(req.params.id));
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