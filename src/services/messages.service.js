const MessagesDAO = require("../DAOs/mongodb/messagesMongo.dao");
const { ApiResponse } = require("../util");

class messagesService {
  constructor() {
    this.messagesDAO = new MessagesDAO();
  }

  getAll = async () => {
    let result = await this.messagesDAO.getAll();

    return result;
  };

  saveMessage = async (message) => {
    let result = await this.messagesDAO.saveMessage(message);

    return new ApiResponse("OK", "", null).response();
  };
}

module.exports = messagesService;
