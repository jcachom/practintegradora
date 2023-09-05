let { Router } = require("express");
const { ApiResponse } = require("../util");

const AutenticacionController = require("../controllers/autenticacion.controller");
const authController = new AutenticacionController();

const router = Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    user = {
      email,
      password,
    };
    let response = await authController.login(user);
    if (response.status == "OK") req.session.user = response.payload;

    res.send(response);
  } catch (error) {
    res.send(new ApiResponse("ERROR", error.message, null).response());
  }
});

router.post("/loginrecover", async (req, res) => {
  try {
    const { email, password } = req.body;
    let response = await authController.loginrecover(email, password);
    res.send(response);
  } catch (error) {
    res.send(new ApiResponse("ERROR", error.message, null).response());
  }
});

router.get("/session", (req, res) => {
  try {
    if (req.session?.counter) {
      req.session.counter = req.session.counter + 1;

      res.send(
        new ApiResponse(
          "OK",
          "Se ha visitado" + req.session.counter + " veces",
          null
        ).response()
      );
    } else {
      req.session.counter = 1;
      res.send(new ApiResponse("OK", "Bienvenido", null).response());
    }
  } catch (error) {
    res.send(new ApiResponse("ERROR", error.message, null).response());
  }
});

router.post("/logout", (req, res) => {
  try {
    req.session.destroy((err) => {
      if (!err) res.send(new ApiResponse("OK", "", null).response());
      else res.send(new ApiResponse("ERROR", err, null).response());
    });
  } catch (error) {
    res.send(new ApiResponse("ERROR", error, null).response());
  }
});

function auth(req, res, next) {
  if (req.session?.user == "pepe" && req.session?.admin) return next();
  return res.send(
    new ApiResponse("ERROR", "error de autorización", null).response()
  );
}

router.get("/privado", auth, (req, res) => {
  res.send(
    new ApiResponse(
      "ERROR",
      "si estas viendo esto es porque ya te logueastes",
      null
    ).response()
  );
});

module.exports = router;
