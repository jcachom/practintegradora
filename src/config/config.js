const dotenv = require("dotenv");

dotenv.config();

let config = {
  PERSISTENCIA: process.env.PERSISTENCIA,
  MONGO_ATLAS_URI: process.env.MONGO_ATLAS_URI,
};

module.exports = { config };
