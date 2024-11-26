const express = require("express");
const router = express.Router();
const setupVideoCall = require("../utils/videoCall");

router.get("/video-call/:sessionId", (req, res) => {
    const { sessionId } = req.params;
    const callUrl = setupVideoCall(sessionId);
    res.json({ url: callUrl });
});

module.exports = router;
