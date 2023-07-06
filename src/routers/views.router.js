let { Router } = require("express");
let productManager = require("../dao/mongodb/productdbManager");
let cartManager = require("../dao/mongodb/cartdbManager");
let messageManager = require("../dao/mongodb/messagesdbManager");

let omessageManager = new messageManager();

let oProducto = new productManager("./database/productos.json");
let oCart = new cartManager();

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

router.get("/products", async (req, res, next) => {
  let paramQuery = {
    cantFilas: new Number(req.query.limit ?? 10),
    page: new Number(req.query.page ?? 1),
    query: req.query.query ?? "",
    queryvalue: req.query.queryvalue ?? "",
    sort: req.query.sort ?? "",
  };
  let email = req.query.email ?? "";
  let rol = req.query.rol ?? "";

  let rspta = await oProducto.getProducts_paginate(paramQuery);
  const { payload, hasPrevPage, hasNextPage, nextPage, prevPage } =
    rspta.payload;

  console.log(hasPrevPage);

  res.render("products", {
    productos: payload,
    hasPrevPage,
    hasNextPage,
    nextPage,
    prevPage,
    email,
    rol,
  });
});

router.get("/carts/:cid", async (req, res, next) => {
  let cid = req.params["cid"];
  let { id, payload } = await oCart.getCartbyId(cid);
  let itemList = [];

  for (const item of payload.products) {
    let producto = {
      ...item.idproducto._doc,
      quantity: item.quantity,
    };
    itemList.push(producto);
  }

  res.render("cartproducts", { cart: cid, productos: itemList });
});



router.get("/register", async (req, res, next) => {
  res.render("register");
});

router.get("/login", async (req, res, next) => {
  res.render("login");
});


router.get("/loginrecover", async (req, res, next) => {
  res.render("loginrecover");
});


module.exports = router;
