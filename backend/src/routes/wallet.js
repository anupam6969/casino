const express = require("express");
const walletController = require("../controllers/walletController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/deposit", authMiddleware, walletController.createDeposit);
router.post("/withdraw", authMiddleware, walletController.createWithdrawal);
router.get("/transactions", authMiddleware, walletController.getTransactions);

module.exports = router;
