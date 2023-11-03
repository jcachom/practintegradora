let { Router } = require("express");
const passport = require("passport");
const { ApiResponse } = require("../util");
const { generateToken, authToken, passportCall } = require("../jwt");
const { config } = require("../config/config");
const UserDTO = require("../DAOs/DTOs/userDTO");
const COOKIESESSION = config.COOKIESESSION;
const router = Router();
const UserController=require("../controllers/users.controller")

const userController=new UserController();

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

// failureRedirect: "/faillogin",
router.post(
  "/login",
  passport.authenticate("login", {
    session: false,
  }),
  async (req, res) => {
    try {
      if (req.status != "OK") {
        return res.send(
          new ApiResponse(
            "ERROR",
            "Error en las credenciales.",
            null
          ).response()
        );
      } else {
        let token = generateToken(req.user);
        let userresp = {
          email: req.user.email,
          role: req.user.role,
          _id : req.user._id.toString(),
          cartId:req.user.cartId ?? ''
        };

       
        let response = new ApiResponse(
          "OK",
          "Autenticación correcta.",
          userresp
        ).response();
        res.cookie(COOKIESESSION, token, { httpOnly: true }).send(response);
        //res.cookie("codercookie", token, { httpOnly: true }).send(response);
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

router.post("/logout",passportCall("jwt"), async (req, res) => {
  try {
   

    let updateUser = await userController.updatelastcnxUser(req.user.user._id.toString());

    res
      .clearCookie(COOKIESESSION)      
      .send(new ApiResponse("OK", "", null).response());
  } catch (error) {
    res.send(new ApiResponse("ERROR", error, null).response());
  }
});

router.post("/sendresetemail", (req, res) => {
  try {
  } catch (error) {
    res.send(new ApiResponse("ERROR", error, null).response());
  }
});

module.exports = router;
