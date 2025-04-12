const express = require("express");
const userProtect = require("../middlewares/userProtect.middleware");
const paymentRouter = express.Router();
const {makePayment , verifyPayment , updatePaymentStatus} = require("../controllers/payment.controllers");



paymentRouter.post("/paymentCreate",userProtect, makePayment);
//No userProtect - Razorpay is calling us
paymentRouter.post("/payment/webhook" , verifyPayment );

paymentRouter.post("/payment/update-status", userProtect, updatePaymentStatus);

module.exports = paymentRouter;