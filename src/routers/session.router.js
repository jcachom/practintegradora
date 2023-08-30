let { Router } = require("express");
const passport = require("passport");
const { ApiResponse } = require("../response");
const { generateToken, authToken, passportCall } = require("../jwt");
const UserDTO = require("../DAOs/DTOs/userDTO");

const router = Router();

router.post(
  "/register",
  passport.authenticate("register", {
    session: false,
    failureRedirect: "/failregister",
  }),
  async (req, res) => {
    res.send(new ApiResponse("OK", "Usuario registrado.", null).response());
  }
);

router.post("/failregister", async (req, res) => {
  res.send(
    new ApiResponse("ERROR", "Error estrategia autenticacion.", null).response()
  );
});

router.post(
  "/login",
  passport.authenticate("login", {
    session: false,
    failureRedirect: "/faillogin",
  }),
  async (req, res) => {
    try {
      if (req.status != "OK") {
        res.send(
          new ApiResponse(
            "ERROR",
            "Error en las credenciales.",
            null
          ).response()
        );
      } else {
        let token = generateToken(req.user);

        let response = new ApiResponse("OK", "Autenticación correcta.", null).response();
        res.cookie("codercookie", token, { httpOnly: true }).send(response);
      }
    } catch (error) {
      res.send(new ApiResponse("ERROR", error.message, null).response());
    }
  }
);

router.get("/faillogin", (req, res) => {
  res.send(new ApiResponse("ERROR", "Falló login.", null).response());
});

router.get("/current", passportCall("jwt"), (req, res) => {
  try {
    const userDTO = new UserDTO(req.user.user);
    req.user.user = userDTO;
    res.send(req.user);
  } catch (error) {
    res.send(new ApiResponse("ERROR", error.message, null).response());
  }
});

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {}
);

router.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  async (req, res) => {
    req.session.user = req.user;
    res.redirect("/products");
  }
);

router.post(
  "/loginrecover",
  passport.authenticate("loginrecover", {
    session: false,
    failureRedirect: "/failloginrecover",
  }),
  async (req, res) => {
    res.send(new ApiResponse("OK", "Usuario actualizado.", null).response());
  }
);

router.get("/failloginrecover", (req, res) => {
  res.send(new ApiResponse("ERROR", "Falló login recover.", null).response());
});

router.post("/logout", (req, res) => {
  try {
    res
      .clearCookie("codercookie")
      .send(new ApiResponse("OK", "", null).response());
  } catch (error) {
    res.send(new ApiResponse("ERROR", error, null).response());
  }
});

module.exports = router;
