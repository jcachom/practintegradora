let ProductService = require("../services/products.service");

const { EErrors } = require("../errors/enum");
const CustomError = require("../errors/customError");

class productController {
  constructor() {
    this.productService = new ProductService();
  }

  async addProduct(product) {
    const result = await this.productService.addProduct(product);
    return result;
  }

  async getProducts() {
    const result = await this.productService.getProducts();
    return result;
  }

  async getProducts_paginate(paramQuery) {
    const result = await this.productService.getProducts_paginate(paramQuery);
    return result;
  }

  async getProductById(uid) {
    CustomError.validateCreateError({
      code: EErrors.INVALID_TYPES_UUID,
      field: "id product",
      value: uid,
    });

    const result = await this.productService.getProductById(uid);
    return result;
  }

  async updateProduct(product) {
    CustomError.validateCreateError({
      code: EErrors.INVALID_TYPES_UUID,
      field: "id product",
      value: product._id,
    });

    const result = await this.productService.updateProduct(product);
    return result;
  }

  async deleteProduct(uid) {
    CustomError.validateCreateError({
      code: EErrors.INVALID_TYPES_UUID,
      field: "id product",
      value: uid,
    });

    const result = await this.productService.deleteProduct(uid);
    return result;
  }
}

module.exports = productController;
