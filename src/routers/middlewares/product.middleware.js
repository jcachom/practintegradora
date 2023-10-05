const { ApiResponse } = require("../../util");
const { config } = require("../../config/config");
const ROL = config.ROL;

const ProductCtl = require("../../controllers/products.controller");
const productCtl = new ProductCtl();
const isauthorizedDelete = (listRole) => {
  return async (req, res, next) => {
    try {
      if (!listRole.includes(req.user.user.role))
        return res.send(
          new ApiResponse("ERROR", "No autorizado.", null).response()
        );

      if (listRole.includes(ROL.PREMIUN)) {
        let uidProd = req.params["pid"];
        let producto = await productCtl.getProductById(uidProd);
        if (!producto)
          return res.send(
            new ApiResponse("ERROR", "Producto no existe.", null).response()
          );

        if (!producto[0].hasOwnProperty("owner"))
          return res.send(
            new ApiResponse(
              "ERROR",
              "No autorizado.Producto sin objeto creador.",
              null
            ).response()
          );

        if (req.user.user.email != producto[0].owner)
          return res.send(
            new ApiResponse(
              "ERROR",
              "No autorizado.Con su rol , solo el creador puede eliminar.",
              null
            ).response()
          );
      }

      next();
    } catch (error) {
      return res.send(new ApiResponse("ERROR", error, null).response());
    }
  };
};

module.exports = { isauthorizedDelete };
