let { Router } = require("express");
const router = Router();

let cartManager = require("../dao/mongodb/cartdbManager");

const { ApiResponse } = require("../response");

let oCart = new cartManager();

router.post("/", async (req, res) => {
  let response;
  try {
    response = await oCart.createCart();
  } catch (error) {
    response = new ApiResponse("ERROR", error.message, null).response();
  }
  res.json(response);
});

router.put("/:cid", async (req, res) => {
  let response;
  try {
    let cid = req.params["cid"];
    let listProduct = req.body;
    response = await oCart.addProductCartMasivo(cid, listProduct);
  } catch (error) {
    response = new ApiResponse("ERROR", error.message, null).response();
  }
  res.json(response);
});

router.post("/:cid/product/:pid", async (req, res) => {
  let response;
  try {
    let cid = req.params["cid"];
    let pid = req.params["pid"];

    let quantity = 1;
    response = await oCart.addProductCart(cid, pid, quantity);
  } catch (error) {
    response = new ApiResponse("ERROR", error.message, null).response();
  }
  res.json(response);
});

router.put("/:cid/product/:pid", async (req, res) => {
  let response;
  try {
    let cid = req.params["cid"];
    let pid = req.params["pid"];
    let { quantity } = req.body;
    quantity = new Number(quantity);

    response = await oCart.addProductCart(cid, pid, quantity);
  } catch (error) {
    response = new ApiResponse("ERROR", error.message, null).response();
  }
  res.json(response);
});

router.get("/", async (req, res) => {
  let response;
  try {
    response = await oCart.getAllCart(true);
  } catch (error) {
    response = new ApiResponse("ERROR", error.message, null).response();
  }

  res.json(response);
});

router.get("/:cid", async (req, res) => {
  let response;
  try {
    let cid = req.params["cid"];
    response = await oCart.getCartbyId(cid);
  } catch (error) {
    response = new ApiResponse("ERROR", error.message, null).response();
  }

  res.json(response);
});

router.delete("/:cid", async (req, res) => {
  let response;
  try {
    let cid = req.params["cid"];
    response = await oCart.deleteCartbyId(cid);
  } catch (error) {
    response = new ApiResponse("ERROR", error.message, null).response();
  }
  res.json(response);
});

router.delete("/:cid/product/:pid", async (req, res) => {
  let response;
  try {
    let cid = req.params["cid"];
    let pid = req.params["pid"];
    response = await oCart.deleteProductFromCart(cid, pid);
  } catch (error) {
    response = new ApiResponse("ERROR", error.message, null).response();
  }

  res.json(response);
});

module.exports = router;
