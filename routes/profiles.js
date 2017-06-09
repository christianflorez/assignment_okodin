const url = require('url');
const express = require('express');
const router = express.Router();
const models = require('./../models');
const User = models.User;
const Profile = models.Profile;
const h = require('./../helpers/path-helpers').registered;
const sequelize = models.sequelize;

router.get('/', (req, res) => {
  res.redirect('back');
});

router.get('/:id', (req, res) => {
  Profile.findById(req.params.id, {
    include: [{model: User}]
  })
    .then(profile => {
      console.log(profile);
      User.findById(profile.userId)
        .then(user => {
          console.log(user);
          res.render('profiles/show', { profile });
        })
    })
    .catch(e => res.status(500).send(e.stack));
});

module.exports = router;