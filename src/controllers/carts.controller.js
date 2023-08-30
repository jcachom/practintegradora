let CartService = require("../services/carts.service");
const { ApiResponse } = require("../response");

class cartController {
  constructor() {
    this.cartService = new CartService();
  }

  async createCart(email) {
    if (email == "")
      return new ApiResponse(
        "ERROR",
        "Email usuario no enviado",
        null
      ).response();
    let result = await this.cartService.createCart(email);

    return result;
  }

  async addProductCartMasivo(uidCart, listProduct) {
    let result = await this.cartService.addProductCartMasivo(
      uidCart,
      listProduct
    );
    return result;
  }

  async addProductCart(uidCart, uidProduct, quantity) {
    let result = await this.cartService.addProductCart(
      uidCart,
      uidProduct,
      quantity
    );
    return result;
  }

  async getAllCart(condetalleProduct = false) {
    let result = await this.cartService.getAllCart(condetalleProduct);
    return result;
  }

  async getCartbyId(uidCart) {
    let result = await this.cartService.getCartbyId(uidCart);
    return result;
  }

  async deleteCartbyId(uidCart) {
    let result = await this.cartService.deleteCartbyId(uidCart);
    return result;
  }

  async deleteProductFromCart(uidCart, uidProduct) {
    let result = await this.cartService.deleteProductFromCart(
      uidCart,
      uidProduct
    );
    return result;
  }
  async getAllTicket() {
    let result = await this.cartService.getAllTicket();
    return result;
  }

  async generarTicket(uidCart) {
    let result = await this.cartService.generarTicket(uidCart);

    return result;
  }
}

module.exports = cartController;
