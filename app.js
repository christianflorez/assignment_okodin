const express = require('express')
const app = express();

// ----------------------------------------
// Body Parser
// ----------------------------------------
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// ----------------------------------------
// Sessions/Cookies
// ----------------------------------------
const cookieSession = require('cookie-session');

app.use(cookieSession({
  name: 'session',
  keys: ['asdf1234567890qwer']
}));

app.use((req, res, next) => {
  res.locals.session = req.session;
  res.locals.currentUser = req.session.currentUser;
  if (req.session.currentUser) {
    res.locals.userid = req.session.currentUser.id;
  }
  next();
});

// ----------------------------------------
// Flash Messages
// ----------------------------------------
const flash = require('express-flash-messages');
app.use(flash());

// ----------------------------------------
// Method Override
// ----------------------------------------
app.use((req, res, next) => {
  let method;
  if (req.query._method) {
    method = req.query._method;
    delete req.query._method;
  } else if (typeof req.body === 'object' && req.body._method) {
    method = req.body._method;
    delete req.body._method;
  }

  if (method) {
    method = method.toUpperCase();
    req.method = method;
  }

  next();
});

// ----------------------------------------
// Static Public Files
// ----------------------------------------
app.use(express.static(`${__dirname}/public`));

// ----------------------------------------
// Logging
// ----------------------------------------
const morgan = require('morgan');
app.use(morgan('tiny'));
app.use((req, res, next) => {
  ['query', 'params', 'body'].forEach((key) => {
    if (req[key]) {
      let capKey = key[0].toUpperCase() + key.substr(1);
      let value = JSON.stringify(req[key], null, 2);
      console.log(`${ capKey }: ${ value }`);
    }
  });
  next();
});

// ----------------------------------------
// Routes
// ----------------------------------------
const sessions = require('./routes/sessions')(app);
const profiles = require('./routes/profiles');
const users = require('./routes/users');
app.use('/', sessions);
app.use('/profiles', profiles);
app.use('/users', users);

// ----------------------------------------
// Template Engine
// ----------------------------------------
const expressHandlebars = require('express-handlebars');
const helpers = require('./helpers/path-helpers');

const hbs = expressHandlebars.create({
  helpers: helpers.registered,
  partialsDir: 'views/',
  defaultLayout: 'application'
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// ----------------------------------------
// Server
// ----------------------------------------
const port = process.env.PORT ||
             process.argv[2] ||
             4003;
const host = 'localhost';

let args;
process.env.NODE_ENV === 'production' ?
                          args = [port] :
                          args = [port, host];

args.push(() => {
  console.log(`Listening: http://${ host }:${ port }`);
});

app.listen.apply(app, args);

module.exports = app;