let UserService = require("../services/users.service");
const { ApiResponse } = require("../util");
const { EErrors } = require("../errors/enum");
const CustomError = require("../errors/customError");

class userController {
  constructor() {
    this.userService = new UserService();
  }

  getAll = async () => {
    let result = await this.userService.getAll();

    return result;
  };

  getAllMain = async () => {
    let result = await this.userService.getAll();
    let listUser = result.map(function(item){
    let user ={
        _id : item._id.toString() ,
        first_name: item.first_name ,
        last_name: item.last_name,
        email: item.email,
        role: item.role
      }
      return user;
  })
 
    return listUser;
  };

  
  //getbyId
  getbyId = async (uid) => {
    let result = await this.userService.getbyId(uid);
    return result;
  };


  getbyEmail = async (email) => {
    let result = await this.userService.getbyEmail(email);
    return result;
  };

  saveUser = async (user) => {
    if (!user.first_name || !user.last_name || !user.email || !user.role)
      return new ApiResponse("ERROR", "Incompleted valores", null).response();

    let result = await this.userService.saveUser(user);

    return result;
  };

  updatelastcnxUser = async (uid) => {
    CustomError.validateCreateError({
      code: EErrors.INVALID_TYPES_UUID,
      field: "id user",
      value: uid,
    });

    let result = await this.userService.updatelastcnxUser(uid);

    return result;

  }

  updateUser = async (uid, user) => {
    CustomError.validateCreateError({
      code: EErrors.INVALID_TYPES_UUID,
      field: "id user",
      value: uid,
    });


/*
    if (!user.first_name || !user.last_name || !user.email || !user.role)
      return new ApiResponse("ERROR", "Incompleted valores", null).response();
      */

    let result = await this.userService.updateUser(uid, user);

    return result;
  };

  


  deleteUser = async (uid) => {
    CustomError.validateCreateError({
      code: EErrors.INVALID_TYPES_UUID,
      field: "id user",
      value: uid,
    });

    let result = await this.userService.deleteUser(uid);

    return result;
  };


  deleteUserInactividad = async () => { 
    let result = await this.userService.deleteUserInactividad();
    return result;
  };

  

  resetemailpassw = async (email) => {
    if (email == "")
      return new ApiResponse(
        "ERROR",
        "Email usuario no enviado",
        null
      ).response();

    let result = await this.userService.getbyEmail(email);
    if (!result)
      return new ApiResponse(
        "ERROR",
        "Email usuario no encontrado.",
        null
      ).response();

    result = await this.userService.resetemailpassw(email);
    return result;
  };

  resetemailverify = async (token, newpwd) => {
    if (!token) {
      return new ApiResponse(
        "ERROR",
        "Usuario token no válido.",
        null
      ).response();
    }
    let result = await this.userService.resetemailverify(token, newpwd);
    return result;
  };
}

module.exports = userController;
