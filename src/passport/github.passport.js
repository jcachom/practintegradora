const passport = require("passport");
const githubStrategy = require("passport-github2");

const userModel = require("../dao/mongodb/models/user.model");

const initializePassportGitHub = () => {
  passport.use(
    "github",
    new githubStrategy(
      {
        clientID: "Iv1.a9f43cb4a1ed097d",
        clientSecret: "6508e815e7952b933080c4219433e87fca4231ba",
        callbackURL: "http://localhost:8080/api/sessions/githubcallback",
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        try {
          // let user = await userModel.findOne({ email: profile._json.email });
          let user = await userModel.findOne({ email: profile._json.login });
          // if (user) return done(null, false);
          if (user) return done(null, user);

          const newUser = {
            first_name: profile._json.login,
            last_name: "testLasname",
            email: profile._json.login,
            age: 0,
            password: "",
            role : "user"
          };
          const result = await userModel.create(newUser);

          return done(null, result);
        } catch (error) {
          return done("error al obtener el resultado" + error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser(async (id, done) => {
    let user = await userModel.findOne(id);
    done(null, user);
  });
};

module.exports = initializePassportGitHub;
