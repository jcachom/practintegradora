let { Router } = require("express");
const router = Router();
const ProductController = require("../controllers/products.controller");
const productController = new ProductController();
const { ApiResponse } = require("../response");
const { rolMdw } = require("../routers/middlewares/roles.middleware");
const { config } = require("../config/config");
const passport = require("passport");
const ROL = config.ROL;

router.get("/:pid", async (req, res) => {
  let response;
  try {
    let uidProd = req.params["pid"];
    response = await productController.getProductById(uidProd);
  } catch (error) {
    response = new ApiResponse("ERROR", error.message, null).response();
  }
  res.json(response);
});
//http://localhost:8080/products/7

router.get("/", async (req, res) => {
  let response;
  try {
    let paramQuery = {
      cantFilas: new Number(req.query.limit ?? 100),
      page: new Number(req.query.page ?? 1),
      query: req.query.query ?? "",
      queryvalue: req.query.queryvalue ?? "",
      sort: req.query.sort ?? "",
    };

    response = await productController.getProducts_paginate(paramQuery);
  } catch (error) {
    response = new ApiResponse("ERROR", error.message, null).response();
  }
  res.json(response);
});

//http://localhost:8080/products/?limit=2

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  rolMdw(ROL.ADMIN),
  async (req, res) => {
    let response;
    try {
      let product = req.body;
      response = await productController.addProduct(product);

      let sockemit = req.query.sockemit ?? "";

      if (sockemit == "realtime") {
        let listallproducts = await productController.getProducts();
        req.socketServer.sockets.emit("ret_realtimeproducts", {
          listProduct: listallproducts,
        });
      }
    } catch (error) {
      response = new ApiResponse("ERROR", error.message, null).response();
    }
    res.json(response);
  }
);

router.put(
  "/:pid",
  passport.authenticate("jwt", { session: false }),
  rolMdw(ROL.ADMIN),
  async (req, res) => {
    let response;
    try {
      let product = req.body;

      product._id = req.params["pid"];
      response = await productController.updateProduct(product);
    } catch (error) {
      response = new ApiResponse("ERROR", error.message, null).response();
    }
    res.json(response);
  }
);

router.delete(
  "/:pid",
  passport.authenticate("jwt", { session: false }),
  rolMdw(ROL.ADMIN),
  async (req, res) => {
    let response;
    try {
      let uidProd = req.params["pid"];
      response = await productController.deleteProduct(uidProd);
    } catch (error) {
      response = new ApiResponse("ERROR", error.message, null).response();
    }
    res.json(response);
  }
);

module.exports = router;
