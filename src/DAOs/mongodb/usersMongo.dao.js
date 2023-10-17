let usersModel = require("./models/user.model");
let cartModel = require("./models/cart.model");


class usersDAO {
  constructor() {}

  getAll = async () => {
    let result = await usersModel.find({}, { password: 0 }).lean();
    
    return result;
  };


  getbyId = async (uid) => {
    let result = await usersModel.find({ _id: uid },{ password: 0 }).lean();
    return result;
  };


  getbyEmail = async (email) => {
    let result = await usersModel.findOne({ email }).lean();

    if (result) {
      result.cartId = "";
      let findCart = await cartModel.findOne({ email: email });
      if (findCart) {
        result.cartId = findCart._id;
      }
    }

    return result;
  };

  saveUser = async (user) => {
    let result = await usersModel.create(user);
    return result;
  };

  updateUser = async (uid, user) => {
    let result = await usersModel.updateOne({ _id: uid }, user);
    return result;
  };


  updatelastcnxUser = async (uid) => {
    let result = await usersModel.updateOne({ _id: uid }, {
      $set: {
        last_connection: Date.now()
      }
      
    });
    return result;
  };

  
  deleteUser = async (uid) => {
    let result = await usersModel.deleteOne({ _id: uid });
    return result;
  };
}

module.exports = usersDAO;
