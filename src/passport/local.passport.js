const passport = require("passport");
const local = require("passport-local");

const UserController = require("../controllers/users.controller");
const userController = new UserController();
const { config } = require("../config/config");
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
          let user = await userController.getbyEmail(username);
          if (user) return done(null, false);

          const newUser = {
            first_name,
            last_name,
            email,
            age,
            role,
            password: createHash(password),
          };

          const result = await userController.saveUser(newUser);
          newUser._id = result.payload._id;

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
          let user = await userController.getbyEmail(username);
          if (!user) {
            req.status = "ERROR";
            return done(null, false);
          }

          let isvalid = isValidPassword(user, password);
          if (!isvalid) {
            req.status = "ERROR";
            return done(null, false);
          }
          req.status = "OK";

          if (user.email == config.ADMIN.EMAIL) user.rol = "admin";

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
          let user = await userController.getbyEmail(username);
          if (!user) return done(null, false);

          user.password = createHash(password);

          let result = await userController.updateUser(user._id, user);

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};

module.exports = initializePassportLocal;
