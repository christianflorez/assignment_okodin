const url = require('url');
const express = require('express');
const router = express.Router();
const models = require('./../models');
const User = models.User;
const Profile = models.Profile;
const h = require('./../helpers/path-helpers').registered;
const sequelize = models.sequelize;

router.post('/', (req, res) => {
  let user;
  let profile;

  let userParams = {
    username: req.body.username,
    email: req.body.email
  };

  sequelize.transaction(t => {
    return User.create(userParams, {
      transaction: t
    })
      .then(result => {
        user = result;
        return Profile.create({
          userId: user.id,
          age: 21,
          aboutMe: "Nothing here yet! Why not tell the world a little about yourself?",
          talents: "Nothing here yet!",
          favorites: "Nothing here yet!",
          whyMessage: "Nothing here yet!",
          gender: "other",
          locationId: 1
        }, {
          transaction:t
        })
      .then(result => {
        profile = result;
        return User.update({ profileId: profile.id }, {
          where: {id: user.id },
          limit: 1,
          transaction: t
        });
      })
      .then(result => {
          req.session.currentUser = {
            username: user.username,
            email: user.email,
            id: user.id,
          };
          res.redirect(h.profilePath(profile.id));
        });
      })
      .catch((e) => {
        if (e.errors) {
          e.errors.forEach((err) => req.flash('error', err.message));
          res.redirect('back');
        } else {
          res.status(500).send(e.stack);
        }
      });
  });
});

router.get('/', (req, res) => {
  res.redirect('back');
});

module.exports = router;