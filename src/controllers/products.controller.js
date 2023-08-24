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

  async getProductById(id) {
    const result = await this.productService.getProductById(id);
    return result;
  }

  async updateProduct(product) {
    const result = await this.productService.updateProduct(product);
    return result;
  }

  async deleteProduct(uid) {
    const result = await this.productService.deleteProduct(uid);
    return result;
  }
}

module.exports = productController;
