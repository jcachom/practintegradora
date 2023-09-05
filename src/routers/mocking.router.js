
let { Router } = require("express");
const router = Router();
const { ApiResponse,generateUser,generateProductsFaker } = require("../util");


router.get("/products", async (req, res) => {
    let response;
    try { 
      response = await generateProductsFaker();
    } catch (error) {
      response = new ApiResponse("ERROR", error.message, null).response();
    }
    res.json(response);
  });
  

  router.get("/generate/products", async (req, res) => {
    let user=[];
    try {
     for (let i = 0; i < 100; i++) {
      user.push(generateUser())
      }
      response = user
  
    } catch (error) {
      response = new ApiResponse("ERROR", error.message, null).response();
    }
    res.send(response);
  });

  
  module.exports = router;
