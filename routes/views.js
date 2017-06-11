const url = require('url');
const express = require('express');
const router = express.Router();
const models = require('./../models');
const sequelize = models.sequelize;
const User = models.User;
const View = models.View;
const Profile = models.Profile;
const Location = models.Location;
const City = models.City;
const h = require('./../helpers/path-helpers').registered;

router.get('/', (req, res) => {
  let viewers;
  let viewees;

  sequelize.transaction(t => {
    return View.findAll({
      where: { vieweeId: req.session.currentUser.id },
      order: '"updatedAt" ASC',
      transaction: t
    })
      .then(views => {
        let viewers = views.map(view => view.viewerId);
        return User.findAll({
          where: { id: viewers },
          include: [{ all: true }],
          transaction: t
        });
      })
      .then(users => {
        viewers = users;
        return View.findAll({
          where: { viewerId: req.session.currentUser.id },
          order: '"updatedAt" ASC',
          transaction: t
        });
      })
      .then(views => {
        let viewees = views.map(view => view.vieweeId);
        return User.findAll({
          where: { id: viewees },
          include: [{ all: true }],
          transaction: t
        });
      })
      .then(users => {
        viewees = users;
        res.render('views/index', {
          viewers,
          viewees
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