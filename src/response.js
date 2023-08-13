let bcrypt = require("bcrypt");

class ApiResponse {
  constructor(status, msg, payload) {
    this.status = status;
    this.msg = msg;
    this.payload = payload;
  }

  response() {
    return {
      status: this.status,
      msg: this.msg,
      payload: this.payload,
    };
  }
}

let ___dirname = __dirname;
const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));
const isValidPassword = (user, password) =>
  bcrypt.compareSync(password, user.password);

module.exports = { ApiResponse, ___dirname, createHash, isValidPassword };
