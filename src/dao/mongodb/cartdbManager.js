let cartModel = require("../mongodb/models/cart.model");

const { ApiResponse } = require("../../response");

let productManager = require("./productdbManager");

let oProducto = new productManager();

class cartManager {
  constructor() {}

  async createCart() {
    let new_cart = null;

    let new_cart_id = 1;
    let cart_find = await cartModel.find().sort({ id: -1 }).limit(1);
    if (cart_find.length > 0) new_cart_id = new Number(cart_find[0].id) + 1;

    new_cart = {
      id: new_cart_id,
      products: [],
    };

    let result = await cartModel.create(new_cart);

    return new ApiResponse("OK", "Cart creado", {
      cart_id: new_cart_id,
    }).response();
  }

  async addProductCartMasivo(idCart, listProduct) {
    let responses = [];
    for (const item of listProduct) {
      let response = await this.addProductCart(idCart, item.id, item.quantity);
      responses.push(response);
    }
    return responses;
  }

  async addProductCart(idCart, idProduct, quantity) {
    idProduct = new Number(idProduct);

    let oCarrito = await cartModel.findOne({ id: { $eq: idCart } });

    if (oCarrito == null)
      return new ApiResponse("ERROR", "Cart no encontrado", null).response();

    let responseProduct = await oProducto.getProductById(idProduct);

    console.log(responseProduct);

    if (responseProduct.length == 0)
      return new ApiResponse("ERROR", "Producto no existe", null).response();

    let ofindProducto = oCarrito.products.find((item) => item.id == idProduct);

    if (ofindProducto) {
      ofindProducto.quantity = ofindProducto.quantity + new Number(quantity);
      let result = await oCarrito.save();
    } else {
      let producto = {
        idproducto: responseProduct.payload[0]._id,
        id: idProduct,
        quantity: new Number(quantity),
      };

      oCarrito.products.push(producto);
      let result = await oCarrito.save();
    }

    return new ApiResponse(
      "OK",
      "producto adicionado/actualizado.",
      null
    ).response();
  }

  async getAllCart(condetalleProduct = false) {
    let list_cart;

    if (condetalleProduct) {
      list_cart = await cartModel.find().populate("products.idproducto");
    } else {
      list_cart = await cartModel.find();
    }

    return list_cart;
  }

  async getCartbyId(idCart) {
    let oCarrito = await cartModel
      .findOne({ id: { $eq: idCart } })
      .populate("products.idproducto");

    if (oCarrito == null)
      return new ApiResponse("ERROR", "Cart no encontrado", null).response();

    return new ApiResponse("OK", "Cart encontrado", oCarrito).response();
  }

  async deleteCartbyId(idCart) {
    let result = await cartModel.deleteOne({ id: { $eq: idCart } });

    if (result.deletedCount > 0)
      return new ApiResponse("OK", "Cart eliminado", null).response();

    return new ApiResponse("ERROR", "Cart no eliminado", null).response();
  }

  async deleteProductFromCart(idCart, idProducto) {
    idProducto = new Number(idProducto);

    let oCarrito = await cartModel.findOne({ id: { $eq: idCart } });

    if (oCarrito == null)
      return new ApiResponse("ERROR", "Cart no encontrado", null).response();

    const index = oCarrito.products.findIndex((item) => item.id == idProducto);

    if (index == -1)
      return new ApiResponse(
        "ERROR",
        "producto no encontrado",
        null
      ).response();

    oCarrito.products.splice(index, 1);

    let result = await oCarrito.save();

    return new ApiResponse("OK", "producto retirado.", null).response();
  }
}

module.exports = cartManager;
