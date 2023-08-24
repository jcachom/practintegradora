let CartService = require("../services/carts.service");


class cartController {
  constructor() {
     this.cartService = new CartService();
  }

  async createCart() {
    let result = await this.cartService.createCart();
    return result;
  }

  async addProductCartMasivo(idCart, listProduct) {
    let result = await this.cartService.addProductCartMasivo(idCart, listProduct);
    return result;
  }

  async addProductCart(idCart, idProduct, quantity) {
    let result = await this.cartService.addProductCart(idCart, idProduct, quantity);
    return result;
  }

  async getAllCart(condetalleProduct = false) {
    let result = await this.cartService.getAllCart(condetalleProduct);
    return result;
  }

  async getCartbyId(idCart) {
    let result = await this.cartService.getCartbyId(idCart);
    return result;
  }

  async deleteCartbyId(idCart) {
    let result = await this.cartService.deleteCartbyId(idCart);
    return result;
  }

  async deleteProductFromCart(idCart, idProducto) {
    let result = await this.cartService.deleteProductFromCart(idCart, idProducto);
    return result;
  }
}

module.exports = cartController;
