if (process.env.NODE_ENV!== 'production'){
  require('dotenv').config()
}

const cors = require('cors')
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
const { validation } = require('./src/middlewares/validationMiddleware');
const { userRegisterSchema } = require('./src/validations/usersValidation');
const { checkAuthenticated } = require('./src/middlewares/authentication');
const app = express();
const port = 5500;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
)

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 7000 * 60 * 60 * 24 } //7 day expiration
}));

app.use(passport.initialize());
app.use(passport.session());

initialize(passport);

//routes
app.use('/books', books);
app.use('/users', users);
app.use('/reflections', reflections);


app.post('/register', parser, validation(userRegisterSchema), usersController.createUser);

app.post('/login', 
  parser, 
  passport.authenticate('local', {failureMessage: true}), 
  (req, res, next)=>{res.sendStatus(201)}
);

app.delete('/logout', (req, res) => {
  req.logOut();
  res.sendStatus(200)
});

app.get('/', function(req, res) {
  res.send('Welcome to the Quotera backend!')
});

app.get('/checkLoggedIn', parser, checkAuthenticated, (req, res, next)=>{res.json({userID: req.user.user_id, isAuthenticated: true})});

//starts up the server on specified port
app.listen(process.env.PORT || port, function() {
  console.log(`Example app listening on port ${port}!`)
});