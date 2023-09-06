 
  const {faker} =require("@faker-js/faker")
  

  const generateUser =() => {


    const objectitem =()=>{
      return {
        _id:faker.database.mongodbObjectId(),
        code : faker.string.alpha(),
        title:faker.commerce.productName(),
        price:faker.commerce.price(),
        department : faker.commerce.department(),
        stock:faker.string.numeric(),
        image : faker.image.url
  
      }
    }

      let cantProducts=parseInt(faker.string.numeric());
      let products =[];
      for (let i = 0; i < cantProducts; i ++) {
        products.push(objectitem())        
      }
      return {
        name : faker.person.firstName(),
        last_name:faker.person.lastName(),
        sex: faker.person.sex(),
        birthDate:faker.date.birthdate(),
        phone:faker.phone.number(),
        products,
        image:faker.internet.avatar(),
        id:faker.database.mongodbObjectId(),
        email:faker.internet.email()
      }
  }

 
  const generateProducts=() => {
    let cantProducts=100;
    let products =[];

    const objectproduct =()=>{
      return {
        _id:faker.database.mongodbObjectId(),
        code : faker.string.alpha(),
        categoria:faker.commerce.productMaterial(),
        title:faker.commerce.productName(),
        description:faker.commerce.productDescription(),
        price:faker.commerce.price(),
        status : true,
        stock:faker.string.numeric(),
        thumbnail: [
          faker.image.url()  ,faker.image.url()
        ]     
      }
    }
    
    for (let i = 0; i < cantProducts; i ++) {
      products.push(objectproduct())        
    }
    return  products
}

 
module.exports = { generateUser,generateProducts};
