let mongoose = require("mongoose");
let mongoosePaginate = require("mongoose-paginate-v2");
const modelCollection = "ticket";

const itemSchema = new mongoose.Schema({
   idProduct:String,
   code :String ,
   description:String,
   price: Number,
   quantity: Number 
 });



const modelSchema = new mongoose.Schema({
 
  code: {
    type: String,
    require: true
  },

  pucrhase_datetime: {
    type: Date,
    require: true,
    default: Date.now
  },
  amount: {
    type: Number,
    require: true,
  },
  pucrhaser: {
    type: String,
    require: true,
  },
  products: [itemSchema],
});

const ticketrModel = mongoose.model(modelCollection, modelSchema);
module.exports = ticketrModel;
