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


 

/*
router.post("/", async (req, res) => {
  let response;
  try {
   const { first_name, last_name, email, birthDate, gender, role } = req.body;

    let newUser = {
      first_name,
      last_name,
      email,
      birthDate,
      gender,
      role,
    }; 
    response = await userController.saveUser(newUser);
  } catch (error) {
    response = new ApiResponse("ERROR", error.message, null).response();
  }
  res.send(response);
});

*/

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

module.exports = router;
