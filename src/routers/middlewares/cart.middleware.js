const { ApiResponse } = require("../../response");
const isCartUserMdw = (req, res, next) => {
  if (req.user.user.cartId === req.params.cid) {
    next();
  } else {
    res.send(
      new ApiResponse(
        "ERROR",
        "Solo puedes agregar productos a tu carrito.",
        null
      ).response()
    );
  }
};

module.exports = { isCartUserMdw };
