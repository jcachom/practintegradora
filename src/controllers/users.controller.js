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

  updateUser = async (uid, user) => {
    CustomError.validateCreateError({
      code: EErrors.INVALID_TYPES_UUID,
      field: "id user",
      value: uid,
    });

    if (!user.first_name || !user.last_name || !user.email || !user.role)
      return new ApiResponse("ERROR", "Incompleted valores", null).response();

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
}

module.exports = userController;
