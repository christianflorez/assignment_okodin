const url = require('url');
const express = require('express');
const router = express.Router();
const models = require('./../models');
const User = models.User;
const h = require('./../helpers/path-helpers').registered;

module.exports = (app) => {
  // Auth
  app.use((req, res, next) => {
    let reqUrl = url.parse(req.url);
    if (!req.session.currentUser &&
        !['/', '/login', h.sessionsPath()].includes(reqUrl.pathname)) {
      res.redirect('/login');
    } else {
      next();
    }
  });

  // New
  const onNew = (req, res) => {
    if (req.session.currentUser) {
      // finds current user's profile and redirects them there
      User.findOne({
        where: {
          id: req.session.currentUser.id
        }
      })
        .then(user => {
          res.redirect(h.profilePath(user.profileId));
          // res.redirect(`/profile/${ user.profileId }`);
        })
        .catch(e => res.status(500).send(e.stack));
    } else {
      res.render('sessions/new');
    }
  };
  router.get('/', onNew);
  router.get('/login', onNew);

  // Check user
  router.post(h.sessionsPath(), (req, res) => {
    // checks database to see if user from post data exists
    User.findOne({
      where: {
        username: req.body.username,
        email: req.body.email
      }
    })
      .then(user => {
        // if user is found, sets session.currentUser to this information and redirects to their profile
        if (user) {
          req.session.currentUser = {
            username: user.username,
            email: user.email,
            id: user.id,
          };
          req.flash('success', 'Welcome back!');
          res.redirect(h.profilePath(user.profileId));
        } else {
        // else sends them back to login
          req.flash('error', 'Error: User could not be found.');
          res.redirect('/login');
        }
      })
      .catch((e) => res.status(500).send(e.stack));
  });

  // Destroy
  const onDestroy = (req, res) => {
    req.session.currentUser = null;
    res.redirect('/login');
  };
  router.get('/logout', onDestroy);
  router.delete('/logout', onDestroy);

  return router;
};