const User = require("../src/DAOs/mongodb/usersMongo.dao");
const chai =require("chai")
 const mongoose=require("mongoose")
const ConnectionMongo = require("../src/connection/connectionMongo");

const connectionMongoInstance = ConnectionMongo.getInstance();

const expect =chai.expect

 
   describe("Testing user DAO",function() {
    let userDao =new User();
    

    before(function () {
   
    });
    it("Dao debe listar los usuarios en formato arreglo", function() {
     

     let sendbd = async () => {
      const result = await userDao.getAll();
     expect(result ).to.be.deep.equal([])
    };
    sendbd();

    //getbyId
    
    }).timeout(5000);

    it("Dao debe listar usuario por uid", function() {
     

      let sendbd = async () => {
       const result = await userDao.getbyId("64ec2e60406534fe491a6080");
      expect(result ).to.be.deep.equal([])
     };
     sendbd();
 
     //
     
     }).timeout(5000);


     it("Dao debe listar usuario por email", function() {
     
      let user=  {
        "first_name": "jOSE3",
        "last_name": "CACHO2",
        "email": "jcachom10@gmail.com",
        "role":"user"
      }
      let sendbd = async () => {
       const result = await userDao.updateUser("65109dd98967a8ca3cacc113",user);
      expect(result ).to.be.deep.equal([])
     };
     sendbd();
 
     //
     
     }).timeout(5000);


  });
 
 

