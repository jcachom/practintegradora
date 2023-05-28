const PUERTO = 8080;
const express = require("express");

const handlebars = require("express-handlebars");
const { Server } = require("socket.io");
let { ___dirname } = require("./response");
const path = require("path");


const app = express();


app.engine("handlebars", handlebars.engine({ defaultLayout: "index" }));
app.set("views", path.join(__dirname, "views", "hbs"));
app.set("view engine", "handlebars");

app.use(express.static(___dirname + "/public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const productsRouter = require("./routers/products.router");
const cartsRouter = require("./routers/carts.router");
const viewsRouter = require("./routers/views.router");

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);
 

let productManager = require("./services/productManager");
let oProducto = new productManager("./database/productos.json");
 
const httpServer = app.listen(PUERTO, () => {
  console.log(`Servidor arriba:http://localhost:${PUERTO}`);
});

const socketServer = new Server(httpServer);

 
socketServer.on("connection", (socket) => {
console.log("Nuevo Cliente conectado");
 
 
  socket.on("realtimeproducts", (data) => {

    let sendpoduct = async () => {
      let result = await oProducto.addProduct(data);
      let listProduct = await oProducto.getProducts(0);
      socketServer.emit("ret_realtimeproducts", { listProduct });
    };
    try {
      sendpoduct();
    } catch (error) {}
  });

});


/*
Vista de productos : http://localhost:8080/
Vista realTime Productos : http://localhost:8080/realtimeproducts

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
