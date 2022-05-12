

const LocalStrategy = require('passport-local').Strategy;
const usersModel = require('../models/usersModel')
const bcrypt = require('bcrypt');

function initialize(passport) {
    async function verify (username, password, done) {
        const data = await usersModel.getUserByUsername(username)
        const user = data.rows[0];

        if (user===undefined) { 
            console.log("user")

              return done(null, false, { message: 'Username not found' });
          }; 
              
        try{
            const match = await bcrypt.compare(password, user.password);
            if(match){
                return done(null, user);
            }else{
                return done(null, false, {message: "Incorrect Password"});
            }
        } catch (e) {
            done(e);
        }
    }
    passport.use(new LocalStrategy(verify))

    passport.serializeUser((user, done) => {
        done(null, user.user_id)
    });
    passport.deserializeUser(async (user_id, done) => {
        const userObject = await usersModel.getUser(user_id)
        return done(null, userObject.rows[0])
    });

}

module.exports = initialize
