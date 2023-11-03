let cartModel = require("./models/cart.model");
let productosModel = require("./models/productos.model");
let ticketModel = require("./models/tickets.model");
const { v4: uuidv4 } = require("uuid");
const { ApiResponse } = require("../../util");

class cartsDAO {
  constructor() {}

  async createCart(email) {
    let new_cart = {
      email: email,
      products: [],
    };

    let result = await cartModel.create(new_cart);

    return result;
  }

  async addProductCartMasivo(uidCart, listProduct) {
    let responses = [];
    for (const item of listProduct) {
      let response = await this.addProductCart(
        uidCart,
        item._id,
        item.quantity,
        "+"
      );
      responses.push(response);
    }
    return responses;
  }

  async addProductCart(uidCart, uidProduct, quantity,accion) {
    let oCarrito = await cartModel.findOne({ _id: { $eq: uidCart } });
    if (oCarrito == null)
      return new ApiResponse("ERROR", "Cart no encontrado", null).response();

    let producto = await productosModel
      .findOne({ _id: { $eq: uidProduct } })
      .lean();

    if (!producto == null)
      return new ApiResponse("ERROR", "Producto no existe", null).response();

    let ofindProducto = oCarrito.products.find(
      (item) => item.producto._id == uidProduct
    );

    if (ofindProducto) {

      if (accion=="+") {
        ofindProducto.quantity = ofindProducto.quantity + new Number(quantity);
      }
      if (accion=="=") {
        ofindProducto.quantity = new Number(quantity);
      }

     
      let result = await oCarrito.save();
    } else {
      let newproducto = {
        producto: producto._id,
        quantity: new Number(quantity),
      };

      oCarrito.products.push(newproducto);
      let result = await oCarrito.save();
    }

    return `[${uidProduct}] producto adicionado/actualizado.`;
  }

  async getAllCart(condetalleProduct = false) {
    let list_cart;

    if (condetalleProduct) {
      list_cart = await cartModel.find().populate("products.producto");
    } else {
      list_cart = await cartModel.find();
    }

    return list_cart;
  }

  async getCartbyId(uidCart) {
    let oCarrito = await cartModel
      .findOne({ _id: { $eq: uidCart } })
      .populate("products.producto");

    return oCarrito;
  }

  async deleteCartbyId(uidCart) {
    let result = await cartModel.deleteOne({ _id: { $eq: uidCart } });
    return result;
  }

  async getCartbyEmail(email) {
    let result = await cartModel.findOne({ email: email });

    return result;
  }

  async deleteProductFromCart(uidCart, uidProduct) {
    let oCarrito = await cartModel.findOne({ _id: { $eq: uidCart } });

    if (oCarrito == null)
      return new ApiResponse("ERROR", "Cart no encontrado", null).response();

    const index = oCarrito.products.findIndex(
      (item) => item.producto._id == uidProduct
    );

    if (index == -1)
      return new ApiResponse(
        "ERROR",
        "producto no encontrado",
        null
      ).response();

    oCarrito.products.splice(index, 1);

    let result = await oCarrito.save();
    return result;
  }

  async getAllTicket() {
    let list_ticket;

    list_ticket = await ticketModel.find().lean();

    return list_ticket;
  }

  async generarTicket(uidCart) {
    let oCarrito = await cartModel.findOne({ _id: { $eq: uidCart } });

    if (oCarrito == null)
      return new ApiResponse("ERROR", "Cart no encontrado", null).response();

    if (oCarrito.products.length == 0)
      return new ApiResponse("ERROR", "Cart sin productos.", null).response();

    let producto;
    let listProductTicket = [];
    let listProductNoDisp = [];
    let totalTicket = 0;

    let addList = (producto, quantity, ldestino) => {
      let item = {
        idProduct: producto._id,
        code: producto.code,
        description: producto.description,
        price: producto.price,
        quantity: quantity,
      };
      if (ldestino == "TICKET") listProductTicket.push(item);
      if (ldestino == "NODISP") listProductNoDisp.push(item);
    };

    let listProducts = oCarrito.products.map((item) => {
      let newitem = {
        _id: item.producto._id.toString(),
        quantity: item.quantity,
      };
      return newitem;
    });

    for (let index = 0; index < listProducts.length; index++) {
      const itemp = listProducts[index];
      producto = await productosModel
        .findOne({ _id: { $eq: itemp._id } })
        .lean();
      if (producto) {
        if (producto.stock >= itemp.quantity) {
          addList(producto, itemp.quantity, "TICKET");
          totalTicket = totalTicket + itemp.quantity * producto.price;
        } else {
          addList(producto, itemp.quantity, "NODISP");
        }
      }
    }

    if (listProductTicket.length == 0)
      return new ApiResponse("ERROR", "Producto sin stock.", null).response();
    let ticket = {
      code: uuidv4(),
      amount: totalTicket,
      pucrhaser: oCarrito.email,
      products: listProductTicket,
    };
    let resultTicket = await ticketModel.create(ticket);

    listProductTicket.forEach((itemticket) => {
      const index = oCarrito.products.findIndex(
        (item) =>
          item.producto._id.toString() == itemticket.idProduct.toString()
      );
      if (index >= 0) oCarrito.products.splice(index, 1);
    });
    let resultCart = await oCarrito.save();
    
    let result={
      ticket: resultTicket,
      noincluido: listProductNoDisp,
    }
    return new ApiResponse("OK", "", result).response();

    /*
    return {
      ticket: resultTicket,
      noincluido: listProductNoDisp,
    }
    */
    ;
  }
}

module.exports = cartsDAO;
