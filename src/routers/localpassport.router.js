let { Router } = require("express");
const passport = require("passport");
const { ApiResponse } = require("../response");
const AutenticacionController = require("../controllers/autenticacion.controller");
const authController = new AutenticacionController();

const router = Router();

router.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "/failregister" }),
  async (req, res) => {
    res.send(new ApiResponse("OK", "Usuario registrado.", null).response());
  }
);

router.post("/failregister", async (req, res) => {
  res.send(
    new ApiResponse("ERROR", "Error estrategia autenticacion", null).response()
  );
});

router.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/faillogin" }),
  async (req, res) => {
    let response = authController.login(req.user);
    if (response.status == "OK") req.session.user = response.user;

    res.send(response);
  }
);

router.get("/faillogin", (req, res) => {
  res.send(new ApiResponse("ERROR", "Falló login.", null).response());
});

router.post("/loginrecover", async (req, res) => {
  try {
    const { email, password } = req.body;
    let response = authController.loginrecover(email, password);
    res.send(response);
  } catch (error) {
    res.send(new ApiResponse("ERROR", error.message, null).response());
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
      if (!err) res.send(new ApiResponse("OK", "", null).response());
      else res.send(new ApiResponse("ERROR", err, null).response());
    });
  } catch (error) {
    res.send(new ApiResponse("ERROR", error.message, null).response());
  }
});

module.exports = router;
