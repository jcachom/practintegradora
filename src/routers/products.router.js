
let { Router } = require("express");
const router = Router();
const ProductController=require("../controllers/products.controller")
const productController=new ProductController();
const { ApiResponse } = require("../response");


router.get("/:pid", async (req, res) => {
  let response;
  try {
    let idProd = req.params["pid"];
    response = await productController.getProductById(idProd);
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
      cantFilas: new Number(req.query.limit ?? 10),
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

router.post("/", async (req, res) => {
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
});

router.put("/:pid", async (req, res) => {
  let response;
  try {
    let product = req.body;
    product.id = new Number(req.params["pid"]);
    response = await productController.updateProduct(product);
  } catch (error) {
    response = new ApiResponse("ERROR", error.message, null).response();
  }
  res.json(response);
});

router.delete("/:pid", async (req, res) => {
  let response;
  try {
    let idProd = req.params["pid"];
    response = await productController.deleteProduct(idProd);
  } catch (error) {
    response = new ApiResponse("ERROR", error.message, null).response();
  }
  res.json(response);
});


 
module.exports = router;
