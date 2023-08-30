let productosModel = require("./models/productos.model");
const { ApiResponse } = require("../../response");

class productDAO {
  constructor() {}

  async addProduct(product) {
    let new_product = {
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

  async getProductById(uidProduct) {
    let productos = await productosModel.find({ _id: { $eq: uidProduct } });
    let list = productos.map((item) => item.toObject());
    return list;
  }

  async updateProduct(product) {
    let result = await productosModel.updateOne({ _id: product._id }, product);
    return result;
  }

  async deleteProduct(uidProduct) {
    let result = await productosModel.deleteOne({ _id: uidProduct });
    return result;
  }
}

module.exports = productDAO;
