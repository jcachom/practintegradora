const passport = require("passport");
const jwt = require("passport-jwt");
const { config } = require("../config/config");
//const PRIVATE_KEY = "jtoken";
const PRIVATE_KEY = config.PRIVATE_KEY_JWT;
const COOKIESESSION = config.COOKIESESSION;

const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const initializePassportJWT = () => {
  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: PRIVATE_KEY,
      },
      async (jwt_payload, done) => {
        try {
          return done(null, jwt_payload);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};
//COOKIESESSION
const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    // token = req.cookies["codercookie"];
    token = req.cookies[COOKIESESSION];
  }
  return token;
};

module.exports = initializePassportJWT;
