let { Router } = require("express");
const router = Router();

const { ApiResponse } = require("../response");
let ChatController = require("../controllers/messages.controller");
let chatController = new ChatController();

router.get("/", async (req, res) => {
  let response;
  try {
    response = await chatController.getAll();
  } catch (error) {
    response = new ApiResponse("ERROR", error.message, null).response();
  }
  res.json(response);
});

router.post("/", async (req, res) => {
  let response;
  try {
    let msgchat = req.body;
    response = await chatController.saveMessage(msgchat);

    let sockemit = req.query.sockemit ?? "";

    if (sockemit == "chat") {
      let listmessages = await chatController.getAll();
      req.socketServer.sockets.emit("ret_messagechatrealtime", {
        listmessages,
      });
    }
  } catch (error) {
    response = new ApiResponse("ERROR", error.message, null).response();
  }
  res.json(response);
});

module.exports = router;
