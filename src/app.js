const PUERTO = 8080;
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const productsRouter = require("./routers/products.router");
const cartsRouter = require("./routers/carts.router");

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.listen(PUERTO, () => {
  console.log(`Servidor arriba:http://localhost:${PUERTO}`);
});

/*
GET:
http://localhost:8080/api/products
http://localhost:8080/api/products/?limit=3
http://localhost:8080/api/products/14

POST:
http://localhost:8080/api/products
{
    "code": "abc200",
    "title": "producto prueba",
     "categoria":"casaca",
    "description": "Este es un producto prueba",
    "price": 200,
    "status": true,
    "stock": 250,
    "thumbnail": [
      "url1",
      "url2"
    ]
  }

PUT:
  http://localhost:8080/api/products/7
  {
    "code": "abc104",
    "title": "produc modif jc-tab.oi-uirddd",
     "categoría" : "casaca",
    "description": "Este es un producto pruebas",
    "price": 200,
    "status": true,
    "stock": 250,
    "thumbnail": [
      "url1",
      "url2"
    ]
  }
DELETE:
  http://localhost:8080/api/products/20


POST:
  http://localhost:8080/api/carts
GET :
  http://localhost:8080/api/carts
  GET:
  http://localhost:8080/api/carts/1
  POST:
  http://localhost:8080/api/carts/1/product/8
 DELETE:
  http://localhost:8080/api/carts/2
*/
