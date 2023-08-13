const passport = require("passport");
const local = require("passport-local");

const userModel = require("../dao/mongodb/models/user.model");
const { createHash, isValidPassword } = require("../response");

const localStrategy = local.Strategy;

const initializePassportLocal = () => {
  passport.use(
    "register",
    new localStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        const { first_name, last_name, email, age, role } = req.body;

        try {
          let user = await userModel.findOne({ email: username });
          if (user) return done(null, false);

          const newUser = {
            first_name,
            last_name,
            email,
            age,
            role,
            password: createHash(password),
          };
          const result = await userModel.create(newUser);
          newUser._id = result._id;
         
          return done(null, newUser);
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

  passport.use(
    "login",
    new localStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        try {
          const user = await userModel.findOne({ email: username }).lean();
          if (!user) return done(null, false);

          if (!isValidPassword(user, password)) return done(null, false);
          req.user = user;
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "loginrecover",
    new localStrategy(
      { usernameField: "email" },
      async (username, password, done) => {
        try {
          const user = await userModel.findOne({ email: username }).lean();
          if (!user) return done(null, false);

          user.password = createHash(password);
          let result = await userModel.updateOne({ email: username }, user);
          return done(null, user);
         
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};

 

module.exports = initializePassportLocal;
