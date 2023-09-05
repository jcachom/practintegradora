let bcrypt = require("bcrypt");
const nodemailer=require("nodemailer")
const {faker} =require("@faker-js/faker")
const { config } = require("./config/config");

class ApiResponse {
  constructor(status, msg, payload) {
    this.status = status;
    this.msg = msg;
    this.payload = payload;
  }

  response() {
    return {
      status: this.status,
      msg: this.msg,
      payload: this.payload,
    };
  }
}




let ___dirname = __dirname;
const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));
const isValidPassword = (user_password, password) =>
  bcrypt.compareSync(password, user_password);

  const transportGmail=nodemailer.createTransport({
    service:"gmail",
    port:587,
    auth:{
      user:config.GMAIL.USER,
      pass:config.GMAIL.CREDENTIAL     
  }});

 
  const   sendEmailGmail=async (to , subject, message)=>{
    let result=await transportGmail.sendMail({
     from : config.GMAIL.USER,
     to :to,
     subject:subject,
     html: `<div>${message} <div>`,
      attachments:[]
    })
    return result
  }

  const generateProduct =()=>{
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
  const generateUser =() => {
      let cantProducts=parseInt(faker.string.numeric());
      let products =[];
      for (let i = 0; i < cantProducts; i ++) {
        products.push(generateProduct())        
      }
      return {
        name : faker.name.firstName(),
        last_name:faker.name.lastName(),
        sex: faker.name.sex(),
        birthDate:faker.date.birthdate(),
        phone:faker.phone.number(),
        products,
        image:faker.internet.avatar(),
        id:faker.database.mongodbObjectId(),
        email:faker.internet.email()
      }
  }


  const generateProductFaker =()=>{
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


  const generateProductsFaker =() => {
    let cantProducts=100;
    let products =[];
    for (let i = 0; i < cantProducts; i ++) {
      products.push(generateProductFaker())        
    }
    return  products
}


 
module.exports = { ApiResponse, ___dirname, createHash, isValidPassword ,sendEmailGmail,generateUser,generateProductsFaker};
