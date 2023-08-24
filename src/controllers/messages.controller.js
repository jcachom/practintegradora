const MessagesService = require("../services/messages.service");

class messagesController {
  constructor() {
    this.messagesService = new MessagesService();
  }

  getAll = async () => {
    let result = await this.messagesService.getAll();

    return result;
  };

  saveMessage = async (message) => {
    let result = await this.messagesService.saveMessage(message);
    return result;
  };
}

module.exports = messagesController;
