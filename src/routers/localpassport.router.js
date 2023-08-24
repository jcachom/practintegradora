let { Router } = require("express");
const passport = require("passport");
const { ApiResponse } = require("../response");
 const AutenticacionController =require("../controllers/autenticacion.controller")
 const authController=new AutenticacionController()

const router = Router();
//const { createHash, isValidPassword } = require("../response");

router.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "/failregister" }),
  async (req, res) => {
    //res.send({ status: "succes", message: "Usuario registrado.", payload: [] });
    res.send(new ApiResponse("OK", "Usuario registrado.", null).response())
  }
);

router.post("/failregister", async (req, res) => {
 // res.send({status: "error", message: "Error estrategia autenticacion",payload: [],});
 res.send(new ApiResponse("ERROR", "Error estrategia autenticacion", null).response())
});

router.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/faillogin" }),
  async (req, res) => {

     
  

  //if (response.status=="succes")
  let response =authController.login(req.user);
  if (response.status=="OK")
  req.session.user=response.user

  res.send(response);

 
  }
);

router.get("/faillogin", (req, res) => {
  res.send( new ApiResponse("ERROR", "Falló login.", null).response())
 // res.send({ status: "error", message: "Falló login." });
});



router.post("/loginrecover", async (req, res) => {
  try {
    const { email, password } = req.body;
    let response = authController.loginrecover(email,password);
    res.send(response)
 
  } catch (error) {
   // response= new ApiResponse("ERROR", error.message, null).response();
    res.send(new ApiResponse("ERROR", error.message, null).response())
  //  res.send({ status: "error", message: error, payload: [] });
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
      //if (!err) res.send({ status: "succes", message: "" });
      if (!err) res.send( new ApiResponse("OK", "", null).response());
      else res.send( new ApiResponse("ERROR", err, null).response())
     // else res.send({ status: "error", message: err });
    });
  } catch (error) {
    //response= new ApiResponse("ERROR", error.message, null).response();
    res.send(new ApiResponse("ERROR", error.message, null).response())
   // res.send({ status: "error", message: error });
  }
});





module.exports = router;



/*
router.post("/loginrecover", async (req, res) => {
  try {
 
    
  
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


router.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/faillogin" }),
  async (req, res) => {

 
    
  if (!req.user)
      return res.send({ status: "error", message: "Usuario no auntenticado." });

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

  

router.get("/current",passport.authenticate('jwt',{session:false}) , (req, res) => {
  res.send(req.user);
})
*/