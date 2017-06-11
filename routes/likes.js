const url = require('url');
const express = require('express');
const router = express.Router();
const models = require('./../models');
const sequelize = models.sequelize;
const User = models.User;
const Like = models.Like;
const h = require('./../helpers/path-helpers').registered;
const { getMatches } = require('./../helpers/like-helpers');


router.get('/', (req, res) => {
  let likers;
  let likees;

  sequelize.transaction(t => {
    return Like.findAll({
      where: { likeeId: req.session.currentUser.id },
      transaction: t
    })
      .then(likes => {
        let likers = likes.map(like => like.likerId);
        return User.findAll({
          where: { id: likers },
          include: [{ all: true }],
          transaction: t
        });
      })
      .then(users => {
        likers = users;
        return Like.findAll({
          where: { likerId: req.session.currentUser.id },
          transaction: t
        });
      })
      .then(likes => {
        let likees = likes.map(like => like.likeeId);
        return User.findAll({
          where: { id: likees },
          include: [{ all: true }],
          transaction: t
        });
      })
      .then(users => {
        likees = users;
        let matches = getMatches(likees, likers);
        res.render('likes/index', {
          likers,
          likees,
          matches
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

router.post('/', (req, res) => {
  let likeParams = {
    likerId: req.session.currentUser.id,
    likeeId: req.body.likee
  }

  Like.findOrCreate({
    defaults: likeParams,
    where: likeParams
  })
    .spread(like => {
      req.flash('success', 'You just liked someone!');
      res.redirect('back');
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

module.exports = router;