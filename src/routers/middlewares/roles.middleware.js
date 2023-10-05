const { ApiResponse } = require("../../util");
const rolMdw = (listRole) => {
  return async (req, res, next) => {
    //if (req.user.user.role != role)
    if (!listRole.includes(req.user.user.role))
      return res.send(
        new ApiResponse("ERROR", "No autorizado.", null).response()
      );

    next();
  };
};

module.exports = { rolMdw };
