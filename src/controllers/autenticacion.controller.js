const AutenticacionService = require("../services/autenticacion.service");
const { ApiResponse } = require("../util");

class autenticacionController {
  constructor() {
    this.authService = new AutenticacionService();
  }

  login = async (user) => {
    let response = await this.authService.login(user.email, user.password);

    return response;
  };

  loginrecover = async (email, password) => {
    if (!email || !password)
      return new ApiResponse("ERROR", "Valores incompletos", null).response();

    let response = await this.authService.loginrecover(email, password);
    return response;
  };

  jwtlogin = async (email, password) => {
    if (!email || !password)
      return new ApiResponse("ERROR", "Valores incompletos.", null).response();

    let result = await this.authService.jwtlogin(email, password);
    return result;
  };

  jwtlogincookie = async (email, password) => {
    if (!email || !password)
      return new ApiResponse("ERROR", "Valores incompletos.", null).response();

    let result = await this.authService.jwtlogincookie(email, password);
    return result;
  };
}

module.exports = autenticacionController;
