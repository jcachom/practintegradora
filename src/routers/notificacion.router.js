let { Router } = require("express");
const router = Router();

const { sendEmailGmail } = require("../utils/email");

const { ApiResponse } = require("../util");
const ClientTwilio = require("twilio");
const { config } = require("../config/config");

router.post("/mail", async (req, res) => {
  try {
    const { to, subject, message } = req.body;
    let result = await sendEmailGmail(to, subject, message);

    res.send(new ApiResponse("OK", result, null).response());
  } catch (error) {
    res.send(new ApiResponse("ERROR", error, null).response());
  }
});

router.post("/sms", async (req, res) => {
  try {
    const { to, message } = req.body;

    const clientTwilio = ClientTwilio(
      config.TWILIO.ACCOUNTID,
      config.TWILIO.AUTHTOKEN
    );
    let result = await clientTwilio.messages.create({
      body: message,
      from: config.TWILIO.PHONENUMBERORIGIN,
      to: to,
    });
    res.send(new ApiResponse("OK", result, null).response());
  } catch (error) {
    res.send(new ApiResponse("ERROR", error, null).response());
  }
});

module.exports = router;
