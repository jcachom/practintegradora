let { Router } = require("express");
const passport = require("passport");
const userModel = require("../dao/mongodb/models/user.model");
 

const router = Router();
const { createHash, isValidPassword } = require("../response");

router.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "/failregister" }),
  async (req, res) => {
    res.send({ status: "succes", message: "Usuario registrado.", payload: [] });
  }
);

router.post("/failregister", async (req, res) => {
  res.send({
    status: "error",
    message: "Error estrategia autenticacion",
    payload: [],
  });
});

router.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/faillogin" }),
  async (req, res) => {
    if (!req.user)
      return res.send({ status: "error", message: "Valores incompletos." });

    req.session.user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      age: req.user.age,
      email: req.user.email,
    };
    req.session.user.rol = "usuario";
    if (req.user.email == "adminCoder@coder.com")
      req.session.user.rol = "admin";

    res.send({ status: "succes", message: "logueado", user: req.session.user });
  }
);

router.get("/faillogin", (req, res) => {
  res.send({ status: "error", message: "Falló login." });
});

/*
router.get("/current",passport.authenticate('jwt',{session:false}) , (req, res) => {
  res.send(req.user);
})
*/

router.post("/loginrecover", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.send({ status: "error", message: "Valores incompletos" });

    const user = await userModel.findOne({ email });
    if (!user)
      return res.send({ status: "error", message: "Usuario no existe." });

    user.password = createHash(password);

    let result = await userModel.updateOne({ email }, user);

    res.send({ status: "succes", message: "recuperado", payload: result });
  } catch (error) {
    res.send({ status: "error", message: error, payload: [] });
  }
});

router.get("/session", (req, res) => {
  try {
    if (req.session?.counter) {
      req.session.counter = req.session.counter + 1;
      res.send("Se ha visitado" + req.session.counter + " veces");
    } else {
      req.session.counter = 1;
      res.send("Bienvenido");
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/logout", (req, res) => {
  try {
    req.session.destroy((err) => {
      if (!err) res.send({ status: "succes", message: "" });
      else res.send({ status: "error", message: err });
    });
  } catch (error) {
    res.send({ status: "error", message: error });
  }
});

module.exports = router;
