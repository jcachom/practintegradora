let { Router } = require("express");

const { ApiResponse } = require("../util");
const AuthController = require("../controllers/autenticacion.controller");
const authController = new AuthController();

const { generateToken, authToken, passportCall } = require("../jwt");
const passport = require("passport");
const router = Router();

router.post("/jwtlogin", async (req, res) => {
  let response;
  try {
    const { email, password } = req.body;

    response = authController.jwtlogin(email, password);
    return response;
  } catch (error) {
    response = new ApiResponse("ERROR", error.message, null).response();
  }
  res.send(response);
});

router.post("/jwtlogincookie", async (req, res) => {
  let response;
  try {
    const { email, password } = req.body;

    response = authController.jwtlogincookie(email, password);
    if (response.status != "OK") res.send(response);

    res
      .cookie("codercookie", response.payload, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
      })
      .send(response);
  } catch (error) {
    res.send(new ApiResponse("ERROR", error.message, null).response());
  }
});

router.get("/jwtcurrent", authToken, (req, res) => {
  res.send(new ApiResponse("OK", "", req.user).response());
});

router.get(
  "/currentpassport",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send(req.user);
  }
);

module.exports = router;
