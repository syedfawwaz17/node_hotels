const passport = require('passport');
const LocalStratergy = require('passport-local').Strategy;
const Person = require('./models/person');

passport.use(new LocalStratergy(async(USERNAME, password, done)=>{
    try{
        console.log('Received credentials:',USERNAME,password)
        const user = await Person.findOne({username: USERNAME});
        if(!user)
                return done(null,false,{message: 'Incorrect username.'})

        const isPasswordMatch = user.comparePassword(password);
        if(isPasswordMatch){
            return done(null,user);

        }else{
            return done(null,false,{message : 'Incorrect password.'});
        }
    }catch(err){
        return done(err);

    }
}))

module.exports = passport;