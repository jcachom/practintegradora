const UsersDAO = require("../DAOs/mongodb/usersMongo.dao");
const { ApiResponse, isValidPassword, createHash } = require("../util");

const { generateToken, verifyToken } = require("../jwt");
const { sendEmailGmail } = require("../utils/email");

class usersService {
  constructor() {
    this.usersDAO = new UsersDAO();
  }

  getAll = async () => {
    let result = await this.usersDAO.getAll();

    return result;
  };

  getbyId = async (uid) => {
    let result = await this.usersDAO.getbyId(uid);
    return result;
  };


  getbyEmail = async (email) => {
    let result = await this.usersDAO.getbyEmail(email);
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

  resetemailpassw = async (email) => {
    let expirationDate = new Date();
    expirationDate.setHours(new Date().getHours() + 1);
    let user = {
      email: email,
      expirationDate: expirationDate,
    };
    let token = generateToken(user);
    const link = `http://localhost:8080/resetpwd?token=${token}`;

    let body = `
    <h2>Hola ${email}</h2>
    <p>Clic en el siguiente enlace para resetaer su contraseña:</p>
    <p>${link}</p>
    <p>En enlace no será válido después de 1 hora.</p>
    <p></p>`;

    let result = await sendEmailGmail(email, "Reseteo contraseña", body);
    return result;
  };

  resetemailverify = async (token, newpwd) => {
    let decodedToken = verifyToken(token);

    if (
      !decodedToken.user.hasOwnProperty("email") ||
      !decodedToken.user.hasOwnProperty("expirationDate")
    ) {
      return new ApiResponse("ERROR", "Token no válido.", null).response();
    }

    const { expirationDate, email } = decodedToken.user;

    if (expirationDate < new Date()) {
      return new ApiResponse("ERROR", "Token ha expirado.", {
        expiration: true,
      }).response();
    }

    let user = await this.usersDAO.getbyEmail(email);
    let isCurrentPwd = isValidPassword(user.password, newpwd);
    if (isCurrentPwd)
      return new ApiResponse(
        "ERROR",
        "El password ya ha sido usado.Debe asignar uno nuevo.",
        null
      ).response();

    let hashpwd = createHash(newpwd);
    user.password = hashpwd;
    let result = await this.usersDAO.updateUser(user._id, user);
    if (result.status == "OK")
      return new ApiResponse("OK", "Password actualizado.", null).response();

    return new ApiResponse("OK", "verificado", null).response();
  };
}

module.exports = usersService;
