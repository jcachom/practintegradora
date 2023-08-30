let { Router } = require("express");
const router = Router();
const passport = require("passport");
let CartController = require("../controllers/carts.controller");
const { ApiResponse } = require("../response");

const { rolMdw } = require("../routers/middlewares/roles.middleware");
const { isCartUserMdw } = require("../routers/middlewares/cart.middleware");

const { config } = require("../config/config");
const ROL = config.ROL;

const cartController = new CartController();

router.post("/", async (req, res) => {
  let response;
  try {
    let { email } = req.body;
    email = email ?? "";
    response = await cartController.createCart(email);
  } catch (error) {
    response = new ApiResponse("ERROR", error.message, null).response();
  }
  res.json(response);
});

router.put(
  "/:cid",
  passport.authenticate("jwt", { session: false }),
  rolMdw(ROL.USER),
  isCartUserMdw,
  async (req, res) => {
    let response;
    try {
      let cid = req.params["cid"];
      let listProduct = req.body;
      response = await cartController.addProductCartMasivo(cid, listProduct);
    } catch (error) {
      response = new ApiResponse("ERROR", error.message, null).response();
    }
    res.json(response);
  }
);

router.post(
  "/:cid/product/:pid",
  passport.authenticate("jwt", { session: false }),
  rolMdw(ROL.USER),
  isCartUserMdw,
  async (req, res) => {
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
  }
);

router.put(
  "/:cid/product/:pid",
  passport.authenticate("jwt", { session: false }),
  rolMdw(ROL.USER),
  async (req, res) => {
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
  }
);

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


router.get("/all/purchase", async (req, res) => {
  let response;
  try {
    response = await cartController.getAllTicket();
  } catch (error) {
    response = new ApiResponse("ERROR", error.message, null).response();
  }

  res.json(response);
});


router.post("/:cid/purchase", async (req, res) => {
  let response;
  try {
    let cid = req.params["cid"];

    response = await cartController.generarTicket(cid);
  } catch (error) {
    response = new ApiResponse("ERROR", error.message, null).response();
  }

  res.json(response);
});

module.exports = router;
