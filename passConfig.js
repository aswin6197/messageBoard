const localStrategy = require("passport-local").Strategy;
const { User } = require("./models");

module.exports = function(passport){
    passport.serializeUser(function(user,done){
        done(null,user.id);
    });

    passport.deserializeUser(function(id,done){
        User.findOne({
            where : {
                id : id
            }
        }).then(user => {
            if(user == null)
                done(new Error("wrong user"));
            else{
                done(null,user);
            }
        })
    });

    passport.use(new localStrategy(
        // usernameField : name,
        function(username,password,done){
            console.log(username,password);
            User.findOne({
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