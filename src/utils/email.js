
const nodemailer=require("nodemailer")
const { config } = require("../config/config");

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

  module.exports = {sendEmailGmail};