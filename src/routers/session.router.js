let { Router } = require("express");
const passport = require("passport");

const { generateToken, authToken, passportCall } = require("../jwt");

const router = Router();

router.post(
  "/register",
  passport.authenticate("register", {
    session: false,
    failureRedirect: "/failregister",
  }),
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
  passport.authenticate("login", {
    session: false,
    failureRedirect: "/faillogin",
  }),
  async (req, res) => {
    if (!req.user)
      return res.send({ status: "error", message: "Valores incompletos." });

    let user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      age: req.user.age,
      email: req.user.email,
      role: req.user.role,
    };

    let token = generateToken(user);
    let response = {
      status: "success",
      email: user.email,
      role: user.role,
    };
    res.cookie("codercookie", token, { httpOnly: true }).send(response);
  }
);

router.get("/faillogin", (req, res) => {
  res.send({ status: "error", message: "Falló login." });
});

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send(req.user);
  }
);

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {}
);

router.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  async (req, res) => {
    console.log("exito");
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
    res.send({
      status: "success",
      message: "Usuario actualizado.",
      payload: [],
    });
  }
);

router.get("/failloginrecover", (req, res) => {
  res.send({ status: "error", message: "Falló login recover." });
});

router.post("/logout", (req, res) => {
  try {
 
 res.clearCookie("codercookie").send({ status: "succes", message: "" });

  } catch (error) {
    res.send({ status: "error", message: error });
  }
});

module.exports = router;
