let productosModel = require("./models/productos.model");
const { ApiResponse } = require("../../response");

class productDAO {
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

    return result;
  }

  async getProducts() {
    let productos = await productosModel.find({}).lean();
    return productos;
  }

  async getProducts_paginate(paginate) {
    let productos;

    let { cantFilas, page, orden, queryc } = paginate;

    productos = await productosModel.paginate(queryc, {
      limit: cantFilas,
      page: page,
      lean: true,
      sort: orden,
    });

    return productos;
  }

  async getProductById(id) {
    let productos = await productosModel.find({ id: { $eq: id } });
    let list = productos.map((item) => item.toObject());
    return list;
  }

  async updateProduct(product) {
    let result = await productosModel.updateOne({ id: product.id }, product);
    return result;
  }

  async deleteProduct(uid) {
    let result = await productosModel.deleteOne({ id: uid });
    return result;
  }
}

module.exports = productDAO;
