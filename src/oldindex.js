const ProductManager = require("./productManager");

let newProduct = {
  code: "abc789",
  title: "producto prueba",
  description: "Este es un producto prueba",
  price: 200,
  thumbnail: "Sin imagen",
  stock: 25,
};

let updProduct = {
  id: 26,
  code: "abc77",
  title: "producto prueba modif",
  description: "Este es un producto prueba",
  price: 200,
  thumbnail: "Sin imagen",
  stock: 25,
};

let response;
let path = "./productos.json";
let oProductManager = new ProductManager(path);

const main = async () => {
  response = await oProductManager.getProducts();
  console.log("---Listado productos inicio-------");
  console.log(response);
  console.log("----------------------------------");

  response = await oProductManager.addProduct(newProduct);

  console.log("Post adición producto:------------");
  console.log(response);
  console.log("----------------------------------");

  await oProductManager.getProducts();

  response = await oProductManager.addProduct(newProduct);
  console.log("Producto mismo código-------------");
  console.log(response);
  console.log("----------------------------------");

  response = await oProductManager.getProductById(1);

  console.log("-----Búsqueda por Id (1)--------");
  console.log(response);
  console.log("----------------------------------");

  response = await oProductManager.updateProduct(updProduct);

  console.log("Actualizar producto:------------");
  console.log(response);
  console.log("----------------------------------");

  response = await oProductManager.deleteProduct(26);

  console.log("Eliminar un producto:------------");
  console.log(response);
  console.log("----------------------------------");

  console.log(response);
};
main();
