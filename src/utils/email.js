const nodemailer = require("nodemailer");
const { config } = require("../config/config");
const { ApiResponse } = require("../util");

const transportGmail = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: config.GMAIL.USER,
    pass: config.GMAIL.CREDENTIAL,
  },
});

const sendEmailGmail = async (to, subject, body) => {
  let mailRequest = {
    from: config.GMAIL.USER,
    to: to,
    subject: subject,
    html: `<div>${body} <div>`,
    attachments: [],
  };
  let result = await transportGmail.sendMail(mailRequest);
  return new ApiResponse("OK", "Correo enviado", null).response();
};

module.exports = { sendEmailGmail };
