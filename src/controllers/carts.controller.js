let CartService = require("../services/carts.service");
const { ApiResponse } = require("../util");

const { EErrors } = require("../errors/enum");
const CustomError = require("../errors/customError");

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
    CustomError.validateCreateError({
      code: EErrors.INVALID_TYPES_UUID,
      field: "id cart",
      value: uidCart,
    });

    let result = await this.cartService.addProductCartMasivo(
      uidCart,
      listProduct
    );
    return result;
  }

  async addProductCart(uidCart, uidProduct, quantity) {
    CustomError.validateCreateError({
      code: EErrors.INVALID_TYPES_UUID,
      field: "id cart",
      value: uidCart,
    });
    CustomError.validateCreateError({
      code: EErrors.INVALID_TYPES_UUID,
      field: "id product",
      value: uidProduct,
    });
    CustomError.validateCreateError({
      code: EErrors.INVALID_TYPES_NUMBER,
      field: "quantity",
      value: quantity,
    });

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
    CustomError.validateCreateError({
      code: EErrors.INVALID_TYPES_UUID,
      field: "id cart",
      value: uidCart,
    });

    let result = await this.cartService.getCartbyId(uidCart);
    return result;
  }

  async deleteCartbyId(uidCart) {
    CustomError.validateCreateError({
      code: EErrors.INVALID_TYPES_UUID,
      field: "id cart",
      value: uidCart,
    });

    let result = await this.cartService.deleteCartbyId(uidCart);
    return result;
  }

  async deleteProductFromCart(uidCart, uidProduct) {
    CustomError.validateCreateError({
      code: EErrors.INVALID_TYPES_UUID,
      field: "id cart",
      value: uidCart,
    });
    CustomError.validateCreateError({
      code: EErrors.INVALID_TYPES_UUID,
      field: "id product",
      value: uidProduct,
    });

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
    CustomError.validateCreateError({
      code: EErrors.INVALID_TYPES_UUID,
      field: "id cart",
      value: uidCart,
    });

    let result = await this.cartService.generarTicket(uidCart);

    return result;
  }
}

module.exports = cartController;
