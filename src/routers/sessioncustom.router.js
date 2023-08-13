let { Router } = require("express");
const passport = require("passport");
const userModel = require("../dao/mongodb/models/user.model");

const router = Router();
const { createHash, isValidPassword } = require("../response");

router.post("/register", async (req, res) => {
  try {
    const { first_name, last_name, email, age, password } = req.body;
    if (!first_name || !last_name || !email || !age || !password)
      return res.send({ status: "error", message: "Valores incompletos" });

    const exists = await userModel.findOne({ email });
    if (exists)
      return res.send({ status: "error", message: "Usuario ya existe." });
    const result = await userModel.create({
      first_name,
      last_name,
      email,
      age,
      password: createHash(password),
    });
    res.send({ status: "succes", message: "ok", payload: result });
  } catch (error) {
    res.send({ status: "error", message: error, payload: [] });
  }
});

router.post("/login", async (req, res) => {
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

    let rol = "usuario";
    if (email == "adminCoder@coder.com" && password == "adminCod3r123")
      rol = "admin";

    req.session.user = { id: user._id, email: email, rol };

    res.send({ status: "succes", message: "logueado", user: req.session.user });
  } catch (error) {
    res.send({ status: "error", message: error, user: "" });
  }
});

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

function auth(req, res, next) {
  if (req.session?.user == "pepe" && req.session?.admin) return next();
  return res.send("error de autorización");
}

router.get("/privado", auth, (req, res) => {
  res.send("si estas viendo esto es porque ya te logueastes");
});

module.exports = router;
