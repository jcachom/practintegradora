let { Router } = require("express");
const router = Router();
const { ApiResponse } = require("../response");

router.get("/setcookie", (req, res) => {
 
  try {
    res
      .cookie("codercookie", "Esto es cookie", { maxAge: 10000, signed: true })
      .send(new ApiResponse("OK", "Cookie generado.", null).response());
  } catch (error) {
 
    res.send(new ApiResponse("ERROR", error.message, null).response());
  }
});

router.get("/getcookie", (req, res) => {
  try {
    res.send(new ApiResponse("OK", "get cookie", req.signedCookies).response() );
  } catch (error) {
 
    res.send( new ApiResponse("ERROR", error.message, null).response());
  }
});

router.get("/deletecookie", (req, res) => {
  try {
    res.clearCookie("codercookie").send(new ApiResponse("OK", "Cookie eliminado.", null).response());
  } catch (error) {
 
    res.send(new ApiResponse("ERROR", error.message, null).response());
  }
});

module.exports = router;
