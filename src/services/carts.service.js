const { ApiResponse } = require("../response");
let CartDAO = require("../DAOs/mongodb/cartMongo.dao");

let cartDAO = new CartDAO();

class cartService {
  constructor() {}

  async createCart() {
    let result = await cartDAO.createCart();

    return new ApiResponse("OK", "", result).response();
  }

  async addProductCartMasivo(idCart, listProduct) {
    let result = await cartDAO.addProductCartMasivo(idCart, listProduct);
    return result;
  }

  async addProductCart(idCart, idProduct, quantity) {
    let result = await cartDAO.addProductCart(idCart, idProduct, quantity);

    return result;
  }

  async getAllCart(condetalleProduct = false) {
    let result = await cartDAO.getAllCart(condetalleProduct);
    return result;
  }

  async getCartbyId(idCart) {
    let result = await cartDAO.getCartbyId(idCart);

    return result;
  }

  async deleteCartbyId(idCart) {
    let result = await cartDAO.deleteCartbyId(idCart);
    if (result.deletedCount > 0)
      return new ApiResponse("OK", "Cart eliminado", null).response();

    return new ApiResponse("ERROR", "Cart no encontrado", null).response();
  }

  async deleteProductFromCart(idCart, idProducto) {
    let result = await cartDAO.deleteProductFromCart(idCart, idProducto);

    return new ApiResponse("OK", "producto retirado.", null).response();
  }
}

module.exports = cartService;
