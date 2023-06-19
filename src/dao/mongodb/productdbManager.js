let productosModel = require("../mongodb/models/productos.model");
const { ApiResponse } = require("../../response");

class productManager {
  constructor() {}

  async addProduct(product) {
    let new_product_id = 1;
    let productos_find = await productosModel.find().sort({ id: -1 }).limit(1);
    if (productos_find.length > 0)
      new_product_id = new Number(productos_find[0].id) + 1;

    let new_product = {
      id: new_product_id,
      ...product,
    };
    let result = await productosModel.create(new_product);

    return new ApiResponse(
      "OK",
      "producto adicionado.",
      new_product
    ).response();
  }

  async getProducts() {
    let productos = await productosModel.find({}).lean();
    return productos;
  }

  async getProductById(id) {
    let productos = await productosModel.find({ id: { $eq: id } });
    let list = productos.map((item) => item.toObject());

    if (!list) {
      return new ApiResponse("ERROR", "No encontrado", null).response();
    }
    return new ApiResponse("OK", "", list).response();
  }

  async updateProduct(product, uid) {
    let result = await productosModel.updateOne({ id: uid }, product);
    if (result.matchedCount > 0 && result.modifiedCount > 0)
      return new ApiResponse("OK", "Actualizado", null).response(); //rpta = 1;

    return new ApiResponse("ERROR", "No encontrado", null).response();
  }

  async deleteProduct(uid) {
    let rpta = 0;
    let result = await productosModel.deleteOne({ id: uid });
    console.log(result);
    if (result.deletedCount > 0)
      return new ApiResponse("OK", "eliminado", null).response();

    return new ApiResponse("ERROR", "No encontrado", null).response();
  }
}

module.exports = productManager;
