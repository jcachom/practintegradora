let { Router } = require("express");
let productManager = require("../services/productManager");
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

module.exports = router;
