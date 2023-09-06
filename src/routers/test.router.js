let { Router } = require("express");
const router = Router();
  
const { generateUser,generateProducts} = require("../utils/generatedata");
 
const { ApiResponse } = require("../util");

router.get("/mockingproducts", async (req, res) => {
  let response;
  try { 
    response = await generateProducts();
  } catch (error) {
    response = new ApiResponse("ERROR", error.message, null).response();
  }
  res.json(response);
});


router.get("/mockingusers", async (req, res) => {
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

 
router.get("/logger", async (req, res) => {
  let response;
  try {
    req.logger.warn("alerta logger level warn")
    response={message:"Prueba logger"}
    
  } catch (error) {
    response = new ApiResponse("ERROR", error.message, null).response();
  }
  res.json(response);
});


router.get("/operacionsimple", async (req, res) => {
  let response;
  try {
    let sum=0;
   for (let i = 0; i < 1000000; i++) {
    sum=sum+i    
   }
    response={suma:sum}
    
  } catch (error) {
    response = new ApiResponse("ERROR", error.message, null).response();
  }
  res.json(response);
});
 
router.get("/operacioncompleja", async (req, res) => {
  let response;
  try {
   
    let sum=0;
    for (let i = 0; i < 5e8; i++) {
     sum=sum+i    
    }
     response={suma:sum}
    
  } catch (error) {
    response = new ApiResponse("ERROR", error.message, null).response();
  }
  res.json(response);
});

module.exports = router;
