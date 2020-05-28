const localStrategy = require("passport-local").Strategy;
const { Users } = require("./models");

module.exports = function(passport){
    passport.serializeUser(function(user,done){
        done(null,user.id);
    });

    passport.deserializeUser(function(id,done){
        Users.findOne({
            where : {
                id : id
            }
        }).then(user =>{
            if(user == null)
                done(new Error("wrong user"));
            else{
                done(null,user);
            }
        })
    });

    passport.use(new localStrategy(
    function(username,password,done){
        Users.findOne({
            where : {
                username : username
            }
        }).then(user =>{
            if(user == null)
                done(null,false);
            if(!user.validatePassword(password))
                done(null,false,{message : "incorrect password"});
            else{
                done(null,user);
            }
        })
    }
    ));
}