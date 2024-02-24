const express = require("express");
const { authMiddleware } = require("../middlewares/middleware");
const { Account } = require("../db");

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res)=>{
    const account = await Account.findOne({userId:req.userId});
    res.status(200).json({balance:account.balance});
});

router.post("/transfer", authMiddleware, async (req, res)=>{
    const {to, amount} = req.body;
    const account = await Account.findOne({userId: req.userId});

    if(account.balance < Number(amount)){
        res.status(400).json({message:"Insufficient Balance"});
        return;
    }

    const toAccount = await Account.findOne({userId: to});

    if(!toAccount){
        res.status(400).json({message: "Invalid account"});
        return;
    }

    await Account.updateOne({userId: req.userId}, {$inc:{balance: -amount}});

    await Account.updateOne({userId: to}, {$inc: {balance: amount}});


    res.json({message: "Transfer successful"});
});




module.exports = router;
