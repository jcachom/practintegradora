const Product = require("../src/DAOs/mongodb/productMongo.dao");
const Assert = require("assert");
const ConnectionMongo = require("../src/connection/connectionMongo");
 

const assert = Assert.strict;
 
const connectionMongoInstance = ConnectionMongo.getInstance();
 
  describe("Testing productos DAO", function() {
   let productDao =new Product();
   let uidProduct ; 
  before(function () {
  });
 
  it("Dao debe listar los productos en formato arreglo ", function() {
 
    let sendbd = async () => {
      const result = await  productDao.getProducts();
      assert.strictEqual(Array.isArray(result), true);
    };
    sendbd();

  }).timeout(5000) ;

  it("Dao debe crear producto ", function() {
 
    let product={
      "code":  new Date().getTime().toString(),
      "title": "producto prueba",
       "categoria":"casaca",
      "description": "Este es un producto prueba",
      "price": 200,
      "status": true,
      "stock": 250,
      "thumbnail": [
        "url1",
        "url2"
      ],
      "owner":"correo06@gmail.com"
    }
  
    let sendbd = async () => {
      const result = await  productDao.addProduct(product);
      uidProduct=result._id;
      assert.ok(result._id);
    };
    sendbd();

  }).timeout(5000) ;


  it("Dao debe buscar producto", function() {
 
    let sendbd = async () => {
      const result = await  productDao.getProductById(uidProduct);
      assert.ok(result._id);
     
    };
    sendbd();

  }).timeout(5000) ;

});


//assert.ok(result._id)
//assert.strictEqual(typeof user,'object')