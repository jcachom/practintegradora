let mongoose = require("mongoose");
let mongoosePaginate = require("mongoose-paginate-v2");
const modelCollection = "cart";
const itemSchema = new mongoose.Schema({
  producto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "productos",
  },

  quantity: {
    type: Number,
    require: true,
    min: 0,
  },
});

const modelSchema = new mongoose.Schema({
  id: Number,
  email: {
    type: String,
    require: true,
  },
  products: [itemSchema],
});

/*
modelSchema.pre('find',function(){
  this.populate('products.idproducto');
})
*/

modelSchema.plugin(mongoosePaginate);
const cartModel = mongoose.model(modelCollection, modelSchema);

module.exports = cartModel;
