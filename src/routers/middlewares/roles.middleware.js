const { ApiResponse } = require("../../response");
const rolMdw = (role) => {
  return async (req, res, next) => {
    if (req.user.user.role != role)
      return res.send(
        new ApiResponse("ERROR", "No autorizado.", null).response()
      );

    next();
  };
};

module.exports = { rolMdw };
