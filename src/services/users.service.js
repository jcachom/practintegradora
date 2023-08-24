const UsersDAO = require("../DAOs/mongodb/usersMongo.dao");
const { ApiResponse } = require("../response");

class usersService {
  constructor() {
    this.usersDAO = new UsersDAO();
  }

  getAll = async () => {
    let result = await this.usersDAO.getAll();

    return result;
  };

  getbyEmail = async (email) => {
    let result = await this.usersDAO.getbyEmail(email)
    return result;
  };


  saveUser = async (user) => {
    let result = await this.usersDAO.saveUser(user);

    return new ApiResponse("OK", "", result).response();
  };

  updateUser = async (uid, user) => {
    let result = await this.usersDAO.updateUser(uid, user);

    if (result.matchedCount > 0)
      return new ApiResponse("OK", "", null).response();

    return new ApiResponse("ERROR", "No encontrado", null).response();
  };

  deleteUser = async (uid) => {
    let result = await this.usersDAO.deleteUser(uid);

    if (result.deletedCount > 0)
      return new ApiResponse("OK", "", null).response();

    return new ApiResponse("ERROR", "No encontrado", null).response();
  };
}

module.exports = usersService;
