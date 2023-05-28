let fs = require("fs");
const { ApiResponse } = require("../response");

class ProductManager {
  constructor(pathProducts) {
    this.path = pathProducts;
  }

  #getNewId(products) {
    return products.length > 0
      ? Number(products[products.length - 1].id) + 1
      : 1;
  }

  #validateField(field, value) {
    switch (field) {
      case "code":
        return value !== "";
      case "title":
        return value !== "";
      case "description":
        return value !== "";
      case "price":
        return !isNaN(value);
      case "stock":
        return !isNaN(value);

      case "status":
        console.log(typeof value);
        return (typeof value).toString() != "boolean";

      case "category":
        return value !== "";
      default:
        return false;
    }
  }

  #validateProduct(product, listProducts) {
    const requiredFields = [
      "code",
      "title",
      "description",
      "price",
      "stock",

      "category",
    ];
    const invalidFields = requiredFields.filter(
      (field) => !this.#validateField(field, product[field])
    );
    if (invalidFields.length > 0) {
      const fields = invalidFields.join(", ");
      return `Verificar ingreso campos: ${fields}`;
    }

    const existingProduct = listProducts.find((p) => p.code == product.code);

    if (existingProduct) {
      return "Código se encuentra registrado.";
    }
    return null;
  }

  async addProduct(product) {
    let listProducts = await this.getProducts();
    const validationMessage = this.#validateProduct(product, listProducts);
    if (validationMessage) {
      return new ApiResponse("ERROR", validationMessage, null).response();
    }

    const newId = this.#getNewId(listProducts);
    const newProduct = { id: newId, ...product };

    listProducts.push(newProduct);

    let contenido = JSON.stringify(listProducts, null, 2);
    await fs.promises.writeFile(`${this.path}`, contenido);

    return new ApiResponse("OK", "", newProduct).response();
  }

  async getProducts() {
    let productos = await fs.promises.readFile(`${this.path}`, "utf-8");
    return JSON.parse(productos);
  }

  async getProductById(id) {
    let listProductos = await this.getProducts();
    let findProduct = listProductos.find((X) => X.id == id);

    if (!findProduct) {
      return new ApiResponse("ERROR", "No encontrado", null).response();
    }
    return new ApiResponse("OK", "", findProduct).response();
  }

  async updateProduct(product) {
    let result;
    result = await this.deleteProduct(product.id);
    if (result.status == "ERROR") return result;
    let new_product = {
      ...product,
    };
    result = await this.addProduct(new_product);
    return result;
  }

  async deleteProduct(id) {
    let listProducts = await this.getProducts();
    const existingProduct = listProducts.find((p) => p.id == id);

    if (!existingProduct) {
      return new ApiResponse(
        "ERROR",
        "Código no se encuentra registrado.",
        null
      ).response();
    }

    let productosList = listProducts.filter((item) => item.id != id);

    if (productosList.length > 0) {
      let contenido = JSON.stringify(productosList, null, 2);
      await fs.promises.writeFile(`${this.path}`, contenido);

      return new ApiResponse("OK", "producto eliminado.", null).response();
    }
  }

  async deleteProductAll() {
    await fs.promises.writeFile(`${this.path}`, "[]");
    return new ApiResponse("OK", "productos eliminados.", null).response();
  }
}

module.exports = ProductManager;
