 

let { Router } = require("express");
const CartController = require("../controllers/carts.controller");
const ProductController = require("../controllers/products.controller");
const ChatController = require("../controllers/messages.controller");
 

const cartController = new CartController();
const productController = new ProductController();
const chatController = new ChatController();

const router = Router();

router.get("/", async (req, res, next) => {
  let list;
 
  list = await productController.getProducts();
  res.render("home", { productos: list });
});

router.get("/realtimeproducts", async (req, res, next) => {
  let productos = [];
 
 productos = await productController.getProducts();
  res.render("realTimeProducts", { productos: productos });
});

router.get("/messagechat", async (req, res, next) => {
  let list;
 
 list = await chatController.getAll();
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

 
  let rspta = await productController.getProducts_paginate(paramQuery);
  const { products, hasPrevPage, hasNextPage, nextPage, prevPage } =
    rspta.payload;

  

  res.render("products", {
    productos: products,
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
 
 let { id, payload } = cartController.getCartbyId(cid)
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

 
router.get("/customlogin", async (req, res, next) => {
  res.render("customlogin");
});
router.get("/customregister", async (req, res, next) => {
  res.render("customregister");
});
router.get("/customloginrecover", async (req, res, next) => {
  res.render("customloginrecover");
});

router.get("/localpassportlogin", async (req, res, next) => {
  res.render("localpassportlogin");
});
router.get("/localpassportregister", async (req, res, next) => {
  res.render("localpassportregister");
});
router.get("/localpassportloginrecover", async (req, res, next) => {
  res.render("localpassportloginrecover");
});

router.get("/jwtlogin", async (req, res, next) => {
  res.render("jsonwebtokenlogin");
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


