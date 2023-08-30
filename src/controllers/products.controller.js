let ProductService = require("../services/products.service");

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

  async getProductById(uidProduct) {
    const result = await this.productService.getProductById(uidProduct);
    return result;
  }

  async updateProduct(product) {
    const result = await this.productService.updateProduct(product);
    return result;
  }

  async deleteProduct(uidProduct) {
    const result = await this.productService.deleteProduct(uidProduct);
    return result;
  }
}

module.exports = productController;
