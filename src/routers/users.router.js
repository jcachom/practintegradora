let { Router } = require("express");
const router = Router();

const UserController = require("../controllers/users.controller");

const userController = new UserController();
const { ApiResponse } = require("../util");

router.get("/", async (req, res) => {
  let response;
  try {
    response = await userController.getAll();
  } catch (error) {
    response = new ApiResponse("ERROR", error.message, null).response();
  }
  res.send(response);
});

router.get("/main", async (req, res) => {
  let response;
  let list ;
  try {
    response = await userController.getAllMain();
    
  } catch (error) {
    response = new ApiResponse("ERROR", error.message, null).response();
  }
  res.send(response);
});



router.get("/:uid", async (req, res) => {
  let response;
  try {
    let { uid } = req.params;
    response = await userController.getbyId(uid);
  } catch (error) {
    response = new ApiResponse("ERROR", error.message, null).response();
  }
  res.send(response);
});

//getbyId

router.put("/:uid", async (req, res) => {
  let response;
  try {
    let { uid } = req.params;
    let userToReplace = req.body;
    response = await userController.updateUser(uid, userToReplace);
  } catch (error) {
    response = new ApiResponse("ERROR", error.message, null).response();
  }
  res.send(response);
});

router.delete("/:uid", async (req, res) => {
  let response;
  try {
    let { uid } = req.params;
    response = await userController.deleteUser(uid);
  } catch (error) {
    response = new ApiResponse("ERROR", error.message, null).response();
  }
  res.send(response);
});


router.delete("/all/inactividad", async (req, res) => {
  let response;
  try {
    response = await userController.deleteUserInactividad();
  } catch (error) {
    response = new ApiResponse("ERROR", error.message, null).response();
  }
  res.send(response);
});

 

router.post("/resetemailpassw", async (req, res) => {
  let response;
  try {
    let { email } = req.body;
    response = await userController.resetemailpassw(email);
  } catch (error) {
    response = new ApiResponse("ERROR", error.message, null).response();
  }
  res.send(response);
});

router.post("/resetemailverify", async (req, res) => {
  let response;
  try {
    const { token, newpwd } = req.body;
    response = await userController.resetemailverify(token, newpwd);
  } catch (error) {
    response = new ApiResponse("ERROR", error.message, null).response();
  }
  res.send(response);
});

module.exports = router;
