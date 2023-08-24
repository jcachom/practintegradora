let { Router } = require("express");
const passport = require("passport");
const { ApiResponse } = require("../response");
const { generateToken, authToken, passportCall } = require("../jwt");
const AutenticacionController =require("../controllers/autenticacion.controller")
//const authController=new AutenticacionController()

const router = Router();

router.post(
  "/register",
  passport.authenticate("register", {
    session: false,
    failureRedirect: "/failregister",
  }),
  async (req, res) => {
    //res.send({ status: "succes", message: "Usuario registrado.", payload: [] });
    res.send(new ApiResponse("OK", "Usuario registrado.", null).response())
  }
);

router.post("/failregister", async (req, res) => {
  res.send(new ApiResponse("ERROR", "Error estrategia autenticacion.", null).response())
 /* res.send({
    status: "error",
    message: "Error estrategia autenticacion",
    payload: [],
  });*/
});

router.post(
  "/login",
  passport.authenticate("login", {
    session: false,
    failureRedirect: "/faillogin",
  }),
  async (req, res) => {
    
    
    
    /*
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
    */
   //let {email , password}=req.user
    //let response =await authController.jwtlogin(email,password);
    if (req.status !="OK")     
    {
      res.send(new ApiResponse("ERROR", "Error en las credenciales.", null).response())
    }else {
      let token = generateToken(req.user);
    //  let token =response.payload;
      let response =new ApiResponse("OK", "Login", req.user).response()
      res.cookie("codercookie", token, { httpOnly: true }).send(response);
    }
   
 
  }
);

router.get("/faillogin", (req, res) => {
 // res.send({ status: "error", message: "Falló login." });
 res.send(new ApiResponse("ERROR", "Falló login.", null).response())
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
   // console.log("exito");
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
  /*  res.send({
      status: "success",
      message: "Usuario actualizado.",
      payload: [],
    });*/
    res.send(new ApiResponse("OK", "Usuario actualizado.", null).response())
  }
);

router.get("/failloginrecover", (req, res) => {
 // res.send({ status: "error", message: "Falló login recover." });
 res.send(new ApiResponse("ERROR", "Falló login recover.", null).response())
});

router.post("/logout", (req, res) => {
  try {
 
 //res.clearCookie("codercookie").send({ status: "succes", message: "" });
 res.clearCookie("codercookie").send(new ApiResponse("OK", "", null).response())

  } catch (error) {
   // res.send({ status: "error", message: error });
   res.send(new ApiResponse("ERROR",error, null).response())
  }
});

module.exports = router;
