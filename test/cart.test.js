const User = require("../src/DAOs/mongodb/usersMongo.dao");
const chai =require("chai")
 
const superTest=require("supertest")
 

const expect =chai.expect
const requester=superTest("http://localhost:8080")
 
   describe("Testing user DAO",function() {
    let userDao =new User();
    

    before(function () {
   
    });
    it("Dao debe listar los usuarios en formato arreglo", function() {
     

     let sendbd = async () => {
      const result = await  requester.get("/api/users")  
      expect(result).to.be.ok
      console.log(result)
    };
    sendbd();
 
    
    }).timeout(5000);

      
  });
 
 

