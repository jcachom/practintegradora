let fs = require("fs");
const { ApiResponse } = require("../response");

let productManager = require("./productManager");
let oProducto = new productManager("./database/productos.json");

class cartManager {
  constructor() {
    this.url = "./database/cart.json";
  }

  async createCart() {
    let list_cart = await this.getAllCart(false);
    let new_cart = null;
    let new_cart_id = await this.getNewId(list_cart);
    new_cart = {
      id: new_cart_id,
      products: [],
    };
    list_cart.push(new_cart);
    let contenido = JSON.stringify(list_cart, null, 2);
    await fs.promises.writeFile(`${this.url}`, contenido);

    return new ApiResponse("OK", "Cart creado", {
      cart_id: new_cart_id,
    }).response();
  }

  async addProductCart(idCart, idProduct, quantity) {
    let carritos = await fs.promises.readFile(`${this.url}`, "utf-8");
    let list_carritos = JSON.parse(carritos);
    let oCarrito = list_carritos.find((item) => item.id == idCart);

    if (oCarrito == undefined)
      return new ApiResponse("ERROR", "Cart no encontrado", null).response();

    let responseProduct = await oProducto.getProductById(idProduct);
    if (responseProduct.status == "ERROR") return responseProduct;

    let ofindProducto = oCarrito.products.find((item) => item.id == idProduct);

    if (ofindProducto) {
      ofindProducto.quantity = ofindProducto.quantity + new Number(quantity);
    } else {
      let producto = {
        id: idProduct,
        quantity: quantity,
      };
      oCarrito.products.push(producto);
    }

    let contenido = JSON.stringify(list_carritos, null, 2);
    await fs.promises.writeFile(`${this.url}`, contenido);

    return new ApiResponse(
      "OK",
      "producto adicionado/actualizado.",
      null
    ).response();
  }

  async getAllCart(condetalleProduct = false) {
    let carritos = await fs.promises.readFile(`${this.url}`, "utf-8");
    let list_cart = JSON.parse(carritos);
    if (condetalleProduct) {
      let listProducts = await oProducto.getProducts();
      list_cart.forEach((item) => {
        item.products = this.#MatchProductsCart(listProducts, item.products);
      });
    }
    return list_cart;
  }

  async getNewId(carritos) {
    let mayor = 0;
    carritos.forEach((element) => {
      if (element.id > mayor) {
        mayor = element.id;
      }
    });
    return mayor + 1;
  }

  #MatchProductsCart(listProducts, productsCart) {
    let listProduct = [];

    productsCart.forEach((item) => {
      let findProduct = null;
      if (listProducts.length > 0)
        findProduct = listProducts.find((x) => x.id == item.id);

      let result_producto = {
        idfind: item.id,
        quantity: item.quantity,
      };
      if (findProduct) {
        result_producto = {
          idfind: item.id,
          quantity: item.quantity,
          ...findProduct,
        };
      }
      listProduct.push(result_producto);
    });

    return listProduct;
  }

  async getCartbyId(idCart) {
    let carritos = await fs.promises.readFile(`${this.url}`, "utf-8");
    let list_carritos = JSON.parse(carritos);
    let findCart = null;

    if (list_carritos.length == 0)
      return new ApiResponse("ERROR", "Cart no encontrado", null).response();

    findCart = list_carritos.find((item) => item.id == idCart);
    if (findCart == undefined)
      return new ApiResponse("ERROR", "Cart no encontrado", null).response();

    let listProducts = await oProducto.getProducts();

    let cartMatchProducts = this.#MatchProductsCart(
      listProducts,
      findCart.products
    );

    findCart.products = cartMatchProducts;

    return new ApiResponse("OK", "Cart encontrado", findCart).response();
  }

  async deleteCartbyId(idCart) {
    let carritos = await fs.promises.readFile(`${this.url}`, "utf-8");
    let list_carritos = JSON.parse(carritos);
    const index = list_carritos.findIndex((item) => item.id == idCart);

    if (index !== -1) {
      list_carritos.splice(index, 1);
      let contenido = JSON.stringify(list_carritos, null, 2);
      await fs.promises.writeFile(`${this.url}`, contenido);
    }

    return new ApiResponse("OK", "Cart eliminado", null).response();
  }

  async deleteProductFromCart(idCart, idProducto) {
     
    let carritos = await fs.promises.readFile(`${this.url}`, "utf-8");
    let list_carritos = JSON.parse(carritos);
    let oCarrito = list_carritos.find((item) => item.id == idCart);

    if (oCarrito == undefined)
      return new ApiResponse("ERROR", "Cart no encontrado", null).response();

    const index = oCarrito.products.findIndex((item) => item.id == idProducto);

    if (index == -1)
      return new ApiResponse(
        "ERROR",
        "producto no encontrado",
        null
      ).response();

    oCarrito.products.splice(index, 1);
    let contenido = JSON.stringify(list_carritos, null, 2);
    await fs.promises.writeFile(`${this.url}`, contenido);

    return new ApiResponse("OK", "producto eliminado", null).response();
  }
}

module.exports = cartManager;
