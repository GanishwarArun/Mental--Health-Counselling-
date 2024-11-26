const express = require("express");
const router = express.Router();

router.post("/process", (req, res) => {
    const { sessionId, amount } = req.body;
    const mockPaymentUrl = `https://mock-payment-gateway.com/pay?sessionId=${sessionId}&amount=${amount}`;
    res.json({ paymentUrl: mockPaymentUrl });
});

module.exports = router;
