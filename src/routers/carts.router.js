let { Router } = require("express");
const router = Router();

 
let CartController= require("../controllers/carts.controller");
const { ApiResponse } = require("../response");

const cartController = new CartController();

router.post("/", async (req, res) => {
  let response;
  try {
    response = await cartController.createCart();
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
    response = await cartController.addProductCartMasivo(cid, listProduct);
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
    response = await cartController.addProductCart(cid, pid, quantity);
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

    response = await cartController.addProductCart(cid, pid, quantity);
  } catch (error) {
    response = new ApiResponse("ERROR", error.message, null).response();
  }
  res.json(response);
});

router.get("/", async (req, res) => {
  let response;
  try {
    response = await cartController.getAllCart(true);
  } catch (error) {
    response = new ApiResponse("ERROR", error.message, null).response();
  }

  res.json(response);
});

router.get("/:cid", async (req, res) => {
  let response;
  try {
    let cid = req.params["cid"];
    response = await cartController.getCartbyId(cid);
  } catch (error) {
    response = new ApiResponse("ERROR", error.message, null).response();
  }

  res.json(response);
});

router.delete("/:cid", async (req, res) => {
  let response;
  try {
    let cid = req.params["cid"];
    response = await cartController.deleteCartbyId(cid);
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
    response = await cartController.deleteProductFromCart(cid, pid);
  } catch (error) {
    response = new ApiResponse("ERROR", error.message, null).response();
  }

  res.json(response);
});

module.exports = router;
