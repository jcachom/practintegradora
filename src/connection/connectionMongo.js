const mongoose = require("mongoose");
const { config } = require("../config/config");
const MONGO_ATLAS_URI = `${config.MONGO_ATLAS_URI}`;
 

class Mongo {
  static #instance;
  constructor() {
    try {
      mongoose.connect(MONGO_ATLAS_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } catch (error) {
       console.log(error);
      
       
    }
  }
  static getInstance() {
    if (this.#instance) return this.#instance;
    this.#instance = new Mongo();
 
  console.log("------------------------------------");
   console.log("conexion establecida Mongo");
    console.log("------------------------------------");
    return this.#instance;
  }
}

module.exports = Mongo;
