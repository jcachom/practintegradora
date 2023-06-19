let { Router } = require("express");
let productManager = require("../dao/mongodb/productdbManager");
let messageManager = require("../dao/mongodb/messagesdbManager");

let omessageManager = new messageManager();

let oProducto = new productManager("./database/productos.json");

const router = Router();

router.get("/", async (req, res, next) => {
  let list;
  list = await oProducto.getProducts();
  res.render("home", { productos: list });
});

router.get("/realtimeproducts", async (req, res, next) => {
  let productos = [];
  productos = await oProducto.getProducts();
  res.render("realTimeProducts", { productos: productos });
});

router.get("/messagechat", async (req, res, next) => {
  let list;
  list = await omessageManager.getAll();
  res.render("messagechat", { messages: list });
});

module.exports = router;
