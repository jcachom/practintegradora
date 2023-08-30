let bcrypt = require("bcrypt");
const nodemailer=require("nodemailer")
 
const { config } = require("../src/config/config");

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
const isValidPassword = (user, password) =>
  bcrypt.compareSync(password, user.password);

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

 
module.exports = { ApiResponse, ___dirname, createHash, isValidPassword ,sendEmailGmail};
