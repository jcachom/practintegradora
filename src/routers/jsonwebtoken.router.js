let { Router } = require("express");
const { createHash, isValidPassword } = require("../response");
const userModel = require("../dao/mongodb/models/user.model");
const { generateToken, authToken, passportCall } = require("../jwt");
const passport = require("passport");
const router = Router();

router.post("/jwtlogin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.send({ status: "error", message: "Valores incompletos." });

    const user = await userModel
      .findOne({ email }, { first_name: 1, last_name: 1, password: 1 })
      .lean();

    let isValidPass = false;
    if (user) {
      isValidPass = isValidPassword(user, password);
    }

    if (!user || !isValidPass)
      return res.send({
        status: "error",
        message: "Usuario o contraseña inválido.",
      });

    const acces_token = generateToken(user);

    res.send({ status: "succes", message: "logueado", acces_token });
  } catch (error) {
    res.send({ status: "error", message: error, user: "" });
  }
});

router.post("/jwtlogincookie", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.send({ status: "error", message: "Valores incompletos." });

    const user = await userModel
      .findOne({ email }, { first_name: 1, last_name: 1, password: 1 })
      .lean();

    let isValidPass = false;
    if (user) {
      isValidPass = isValidPassword(user, password);
    }

    if (!user || !isValidPass)
      return res.send({
        status: "error",
        message: "Usuario o contraseña inválido.",
      });
    const acces_token = generateToken(user);
    res
      .cookie("codercookie", acces_token, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
      })
      .send({ message: "login" });
  } catch (error) {
    res.send({ status: "error", message: error, user: "" });
  }
});

router.get("/jwtcurrent", authToken, (req, res) => {
  res.send({ status: "success", payload: req.user });
});

router.get(
  "/currentpassport",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send(req.user);
  }
);

/*
  router.get('/currentpassport',passportCall('jwt'),(req,res)=>{
    res.send(req.user)
  }) */

module.exports = router;
