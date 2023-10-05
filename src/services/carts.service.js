const { ApiResponse } = require("../util");
let CartDAO = require("../DAOs/mongodb/cartMongo.dao");
let UserDAO = require("../DAOs/mongodb/usersMongo.dao");

class cartService {
  constructor() {
    this.cartDAO = new CartDAO();
    this.userDAO = new UserDAO();
  }

  async createCart(email) {
    let user = await this.userDAO.getbyEmail(email);
    if (!user)
      return new ApiResponse("ERROR", "No existe usuario", null).response();

    if (user.cartId != "")
      return new ApiResponse(
        "OK",
        "Usuario ya cuenta con Cart.",
        null
      ).response();

    let result = await this.cartDAO.createCart(email);

    return new ApiResponse("OK", "", result).response();
  }

  async addProductCartMasivo(uidCart, listProduct) {
    let result = await this.cartDAO.addProductCartMasivo(uidCart, listProduct);
    return result;
  }

  async addProductCart(uidCart, uidProduct, quantity) {
    let result = await this.cartDAO.addProductCart(
      uidCart,
      uidProduct,
      quantity
    );

    return result;
  }

  async getAllCart(condetalleProduct = false) {
    let result = await this.cartDAO.getAllCart(condetalleProduct);
    return result;
  }

  async getCartbyId(uidCart) {
    let result = await this.cartDAO.getCartbyId(uidCart);

    return result;
  }

  async deleteCartbyId(uidCart) {
    let result = await this.cartDAO.deleteCartbyId(uidCart);
    if (result.deletedCount > 0)
      return new ApiResponse("OK", "Cart eliminado", null).response();

    return new ApiResponse("ERROR", "Cart no encontrado", null).response();
  }

  async deleteProductFromCart(uidCart, uidProduct) {
    let result = await this.cartDAO.deleteProductFromCart(uidCart, uidProduct);

    return new ApiResponse("OK", "producto retirado.", null).response();
  }

  async getAllTicket() {
    let result = await this.cartDAO.getAllTicket();
    return result;
  }

  async generarTicket(uidCart) {
    let result = await this.cartDAO.generarTicket(uidCart);

    return new ApiResponse("OK", "Compra confirmada.", result).response();
  }
}

module.exports = cartService;
