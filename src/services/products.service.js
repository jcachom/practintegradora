const ProductDAO = require("../DAOs/mongodb/productMongo.dao");
const { ApiResponse } = require("../response");

class productService {
  constructor() {
    this.productDAO = new ProductDAO();
  }

  async addProduct(product) {
    let result = await this.productDAO.addProduct(product);

    return new ApiResponse("OK", "", result).response();
  }

  async getProducts() {
    const result = await this.productDAO.getProducts();
    return result;
  }

  async getProducts_paginate(paramQuery) {
    let { cantFilas, page, query, queryvalue, sort } = paramQuery;

    let orden = {};

    if (sort == "asc") orden = { price: 1 };
    if (sort == "desc") orden = { price: -1 };

    let queryc = {};
    if (query != "" && queryvalue != "") {
      if (query == "categoria") queryc = { categoria: queryvalue };
      if (query == "disponibilidad") queryc = { status: queryvalue };
    }

    let paginate = {
      cantFilas,
      page,
      orden,
      queryc,
    };
    const productos = await this.productDAO.getProducts_paginate(paginate);

    return new ApiResponse("OK", "", {
      totalPages: productos.totalPages,
      prevPage: productos.prevPage,
      nextPage: productos.nextPage,
      hasPrevPage: productos.hasPrevPage,
      hasNextPage: productos.hasNextPage,
      prevLink: productos.prevLink,
      nextLink: productos.nextLink,
      products: productos.docs,
    }).response();
  }

  async getProductById(uidProduct) {
    let productos = await this.productDAO.getProductById(uidProduct);

    return productos;
  }

  async updateProduct(product) {
    let result = await this.productDAO.updateProduct(product);

    if (result.matchedCount > 0 && result.modifiedCount > 0)
      return new ApiResponse("OK", "", null).response();

    return new ApiResponse("ERROR", "No encontrado", null).response();
  }

  async deleteProduct(uidProduct) {
    let result = await this.productDAO.deleteProduct(uidProduct);

    if (result.deletedCount > 0)
      return new ApiResponse("OK", "", null).response();

    return new ApiResponse("ERROR", "No encontrado", null).response();
  }
}

module.exports = productService;
