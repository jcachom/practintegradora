let { Router } = require("express");
const router = Router();

let cartManager = require("../services/cartManager");

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

router.post("/:cid/product/:pid", async (req, res) => {
  let response;
  try {
    let cid = req.params["cid"];
    let pid = req.params["pid"];
    //let quantity = new Number(req.params["quantity"]);
    let quantity = 1;
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
