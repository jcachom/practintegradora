const dotenv = require("dotenv");

dotenv.config();

let config = {
  PERSISTENCIA: process.env.PERSISTENCIA,
  MONGO_ATLAS_URI: process.env.MONGO_ATLAS_URI,
  PORT: process.env.PORT,
  PRIVATE_KEY_JWT: process.env.PRIVATE_KEY_JWT,
  COOKIESESSION: process.env.COOKIESESSION,

  ADMIN: {
    EMAIL: process.env.ADMIN_EMAIL,
    PASS: process.env.ADMIN_PASS,
  },
  ROL: {
    ADMIN: process.env.ROLADMIN,
    USER: process.env.ROLUSER,
    PREMIUN: process.env.ROLPREMIUN,
  },
  TOKENEXPIRES: process.env.TOKENEXPIRES,
  GMAIL: {
    USER: process.env.GMAILUSER,
    CREDENTIAL: process.env.GMAILCREDENTIAL,
  },
  TWILIO: {
    ACCOUNTID: process.env.TWILIOACCOUNTID,
    AUTHTOKEN: process.env.TWILIOAUTHTOKEN,
    PHONENUMBERORIGIN: process.env.TWILIOPHONENUMBERORIGIN,
  },
  ENVIRONMENT: {
    CURRENT: process.env.ENVIRONMENT,
  },
};

module.exports = { config };
