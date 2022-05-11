if (process.env.NODE_ENV!== 'production'){
  require('dotenv').config()
}

const express = require('express');
const session = require('express-session');
const usersController = require('./src/controllers/usersController')
const bodyParser = require('body-parser')
const parser = bodyParser.json();
const books = require('./src/routes/books.js');
const users = require('./src/routes/users.js');
const reflections = require('./src/routes/reflections.js');
const passport = require('passport');
const initialize = require('./src/config/passport-config');

const app = express();
const port = 3000;


app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 60 * 24 } //one day expiration
}));

app.use(passport.initialize());
app.use(passport.session());

initialize(passport);

//routes
app.use('/books', books);
app.use('/users', users);
app.use('/reflections', reflections);


app.post('/register', parser, usersController.createUser);

app.post('/login', parser, passport.authenticate('local', {failureMessage: true , successMessage:"yay"}), (req, res, next)=>{res.send("yay")});

app.delete('/logout', (req, res) => {
  req.logOut();
  res.send("logged out")
});

app.get('/', function(req, res) {
  res.send('Hello World!')
});

//starts up the server on specified port
app.listen(process.env.PORT || port, function() {
  console.log(`Example app listening on port ${port}!`)
});