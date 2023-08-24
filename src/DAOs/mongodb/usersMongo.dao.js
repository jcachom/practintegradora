let usersModel = require("./models/user.model");

class usersDAO {
  constructor() {}

  getAll = async () => {
    let result = await usersModel.find().lean();
    return result;
  };

  getbyEmail = async (email) => {
    let result = await usersModel.findOne({ email }).lean();

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

  deleteUser = async (uid) => {
    let result = await usersModel.deleteOne({ _id: uid });
    return result;
  };
}

module.exports = usersDAO;
