let { Router } = require("express");
const router = Router();
let chatManager = require("../dao/mongodb/messagesdbManager");
let ochatManager = new chatManager();

const { ApiResponse } = require("../response");

router.get("/", async (req, res) => {
  let response;
  try {
    response = await ochatManager.getAll();
  } catch (error) {
    response = new ApiResponse("ERROR", error.message, null).response();
  }
  res.json(response);
});

router.post("/", async (req, res) => {
  let response;
  try {
    let msgchat = req.body;
    response = await ochatManager.saveMessage(msgchat);

    let sockemit = req.query.sockemit ?? "";

    if (sockemit == "chat") {
      let listmessages = await ochatManager.getAll();
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
