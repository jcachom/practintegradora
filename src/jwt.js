let jwt = require("jsonwebtoken");
const PRIVATE_KEY = "jtoken";
const passport = require("passport");

const generateToken = (user) => {
  const token = jwt.sign({ user }, PRIVATE_KEY, { expiresIn: "24h" });
  //const token=jwt.sign({user},PRIVATE_KEY,{expiresIn:'20s'})

  return token;
};

const authToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).send({ error: "Not authenticated" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
    if (error) return res.status(403).send({ error: "Not authorized" });
    req.user = credentials.user;
    next();
  });
};

const passportCall = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, function (err, user, info) {
      if (err) return next(err);
      if (!user)
        return res
          .status(401)
          .send({ error: info.messages ? info.messages : info.toString() });
      req.user = user;
      next();
    })(req, res, next);
  };
};

const authorization = (role) => {
  return async (req, res, next) => {
    if (!req.user) return res.status(401).send({ error: "No autorizado" });
    if (req.user.role != role)
      return res.status(403).send({ error: "No permitido" });
    next();
  };
};

module.exports = { generateToken, authToken, passportCall, authorization };