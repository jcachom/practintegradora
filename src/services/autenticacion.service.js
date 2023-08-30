const { isValidPassword, ApiResponse, createHash } = require("../response");
const { generateToken } = require("../jwt");
const UserDAO = require("../DAOs/mongodb/usersMongo.dao");

class autenticacionService {
  constructor() {
    this.userDAO = new UserDAO();
  }

  login = async (email, password) => {
    const user = await this.userDAO.getbyEmail(email);

    let isValidPass = false;
    if (user) {
      isValidPass = isValidPassword(user, password);
    }

    if (!user || !isValidPass)
      return new ApiResponse(
        "ERROR",
        "Usuario o contraseña inválido.",
        null
      ).response();

    let userlogin = {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,

      role: user.role,
    };

    return new ApiResponse("OK", "", userlogin).response();
  };

  loginrecover = async (email, password) => {
    let user = await this.userDAO.getbyEmail(email);
    if (!user) return { status: "error", message: "Usuario no existe." };

    user.password = createHash(password);

    let result = await this.userDAO.updateUser(user._id, user);
    if (result.matchedCount > 0)
      return new ApiResponse("OK", "", null).response();

    return new ApiResponse(
      "ERROR",
      "No se modificó credencial.",
      null
    ).response();
  };

  jwtlogin = async (email, password) => {
    const user = await this.userDAO.getbyEmail(email);

    let isValidPass = false;
    if (user) {
      isValidPass = isValidPassword(user, password);
    }

    if (!user || !isValidPass)
      return new ApiResponse(
        "ERROR",
        "Usuario o contraseña inválido.",
        null
      ).response();

    user = {
      first_name,
      last_name,
    };

    const acces_token = generateToken(user);
    return new ApiResponse("OK", "", acces_token).response();
  };

  jwtlogincookie = async (email, password) => {
    const user = await this.userDAO.getbyEmail(email);
    let isValidPass = false;
    if (user) {
      isValidPass = isValidPassword(user, password);
    }

    if (!user || !isValidPass)
      return new ApiResponse(
        "ERROR",
        "Usuario o contraseña inválido.",
        null
      ).response();

    const acces_token = generateToken(user);

    return new ApiResponse("OK", "", acces_token).response();
  };
}

module.exports = autenticacionService;
