const ObjectId = require("mongoose").Types.ObjectId;
const { EErrors } = require("./enum");

const isValidObjectId = (id) => {
  if (ObjectId.isValid(id)) {
    if (String(new ObjectId(id)) === id) return true;
    return false;
  }
  return false;
};

const getMessage = (code, field, value) => {
  let message = "";
  switch (code) {
    case EErrors.ERROR:
      message = ` Ocurrió un error durante el proceso.`;
      break;
    case EErrors.INVALID_TYPES_UUID:
      let valid = isValidObjectId(value);

      if (valid == false)
        message = ` ${field} :No corresponde a código formato UUID.`;
      break;

    case EErrors.INVALID_EMPTY:
      if (value == "") message = ` ${field} :Debe tener valor obligatorio.`;
      break;

    case EErrors.INVALID_TYPES_NUMBER:
      let num = Number(value);
      if (num == 0) message = `${field} :Debe ser numérico.`;

      break;

    default:
      message = "Error código no configurado.";
      break;
  }
  return message;
};

class CustomError {
  static validateCreateError({ code, field, value }) {
    let message = getMessage(code, field, value);
    if (message.length > 0) {
      const error = new Error(message);
      error.name = "ERROR";
      error.code = code;
      throw error;
    }
  }
}

module.exports = CustomError;
