const ProductDAO = require("../DAOs/mongodb/productMongo.dao");
const UserDAO = require("../DAOs/mongodb/usersMongo.dao");
const { ApiResponse } = require("../util");
const { sendEmailGmail } = require("../utils/email");
const { config } = require("../config/config");
const ROL = config.ROL;


class productService {
  constructor() {
    this.productDAO = new ProductDAO();
    this.userDAO = new UserDAO();
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
    let user;
    let producto = await this.productDAO.getProductById(uidProduct);

    if (!producto)
    return new ApiResponse("ERROR", "No encontrado", null).response();


 
      if (  producto[0].hasOwnProperty("owner")) 
      user =await this.userDAO.getbyEmail(producto[0].owner)

      let result = await this.productDAO.deleteProduct(uidProduct);  
 
     

    if (result.deletedCount > 0)
    {
 
      if (user) {

        if ( user.role==ROL.PREMIUN){
          let body = `Estimado usuario , el producto con uid ${uidProduct} ha sido eliminado.`;
          result = await sendEmailGmail(user.email, "Eliminación producto", body);
          return new ApiResponse("OK", "Producto eliminado y notificado.", null).response();
        } 
        
      

      }

    }
  

 
  }
}

module.exports = productService;
