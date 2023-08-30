const dotenv = require("dotenv");

dotenv.config();

let config = {
  PERSISTENCIA: process.env.PERSISTENCIA,
  MONGO_ATLAS_URI: process.env.MONGO_ATLAS_URI,
 
  ADMIN : {
    EMAIL :process.env.ADMIN_EMAIL,
    PASS :process.env.ADMIN_PASS,
  },
  ROL : {
    ADMIN :process.env.ROLADMIN,
    USER: process.env.ROLUSER,
  },
  TOKENEXPIRES: process.env.TOKENEXPIRES,
  GMAIL : {
    USER : process.env.GMAILUSER,
    CREDENTIAL:process.env.GMAILCREDENTIAL
  },
  TWILIO : {
    ACCOUNTID:process.env.TWILIOACCOUNTID,
    AUTHTOKEN:process.env.TWILIOAUTHTOKEN,
    PHONENUMBERORIGIN : process.env.TWILIOPHONENUMBERORIGIN
  }
 
};

module.exports = { config };
