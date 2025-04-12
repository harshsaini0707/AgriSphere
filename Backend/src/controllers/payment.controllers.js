const instance = require("../utils/razorpay")
const paymentModel = require("../models/payment.model")
const {validateWebhookSignature} = require('razorpay/dist/utils/razorpay-utils')
const { cartModel } = require("../models/cart.model")

const makePayment = async(req,res)=>{
    try {
        if(!req.user || !req.user._id){
            return res.status(401).send(`Unauhtorized User - Please Login!!`)
        }

        const {total} = req.body;

        if(!total) return res.status(404).send(`Total Proce Error !!`)
        const {firstName , lastName , email} = req.user;

        const order =   await  instance.orders.create({
            "amount": total * 100,
            "currency": "INR",
            "receipt": "receipt#1",
            "partial_payment": false,
            "notes": { //pass info
              firstName,
              lastName,
              email
            }
          })
       // console.log(order);
        

          //save it in DB
          const payment = new paymentModel({
            userId:req.user._id,
            orderId:order.id,
            status:order.status,
            amount:order.amount,
            currency:order.currency,
            receipt:order.receipt,
            notes:order.notes
          })

          const savedPayment = await payment.save();
          //return back my order detail to frontend
          return res.json({...savedPayment.toJSON() , keyId: process.env.YOUR_KEY_ID})
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

// const verifyPayment = async(req,res)=>{
//   try {
//     //this header that's we need to verify
//     const webhookSignature = req.headers["x-razorpay-signature"];
// console.log("webhook" + webhookSignature);

//     // return boolean
//    const isWebHookValid = validateWebhookSignature(
//       JSON.stringify(req.body),
//       webhookSignature,
//       process.env.WEB_HOOK_SECRET)

//  if(!isWebHookValid){
//   return res.status(400).json({msg:"WebHook Signature is Invalid!!"})
//  }
//  //update my status in DB
//  const paymentDetails = req.body.payload.payment.entity;

//  const payment = await paymentModel.findOne({orderId : paymentDetails.order_id});
//  payment.status = paymentDetails.status;
//  await payment.save();
 

//  //return success response to razorpay
//  const buyerId = payment.userId; 
//  console.log("data"+buyerId);
 

// const cartItems = await cartModel.find({ buyerId });
// console.log("Cart items found for this user:", cartItems.length);

  
// await cartModel.updateMany(
//   { buyerId , buyStatus: false },
//   { $set: { buyStatus: true, orderStatus: "Pending", orderDate: new Date() } }
// );




//  //req.body give access to a event
// //  if (req.body.event === "payment.captured") {

// // }
// //  if(req.body.event === "payment.failed"){
  
// //  }

//  return res.status(200).send("Webhook received sucessfully")

//   } catch (error) {
//     return res.status(500).send(error.message)
//   }
// }

const verifyPayment = async(req, res) => {
  try {
    // This header that's we need to verify
    const webhookSignature = req.get("X-Razorpay-Signature"); // Note lowercase header name
    console.log("Webhook signature:", webhookSignature);

    if (!webhookSignature) {
      console.log("Missing webhook signature");
      return res.status(400).json({msg: "Missing Webhook Signature"});
    }

    // Validate the webhook signature
    const isWebHookValid = validateWebhookSignature(
      JSON.stringify(req.body),
      webhookSignature,
      process.env.WEB_HOOK_SECRET
    );

    if (!isWebHookValid) {
      console.log("Invalid webhook signature");
      return res.status(400).json({msg: "WebHook Signature is Invalid!!"});
    }

    console.log("Webhook event:", req.body.event);
    
    // Update payment status in DB
    const paymentDetails = req.body.payload.payment.entity;
    console.log("Payment details:", paymentDetails.order_id, paymentDetails.status);

    const payment = await paymentModel.findOne({orderId: paymentDetails.order_id});
    if (!payment) {
      console.log("Payment not found for order ID:", paymentDetails.order_id);
      return res.status(404).json({msg: "Payment not found"});
    }
    
    payment.status = paymentDetails.status;
    await payment.save();
    
    // Get buyer ID from payment
    const buyerId = payment.userId; 
    console.log("Processing payment for buyer:", buyerId);
    
    // Only update cart if payment was captured (successful)
    if (req.body.event === "payment.captured") {
      // Find cart items for this buyer
      const cartItems = await cartModel.find({ buyerId, buyStatus: false });
      console.log("Cart items found for this user:", cartItems.length);
      
      if (cartItems.length > 0) {
        // Update cart items to purchased
        const updateResult = await cartModel.updateMany(
          { buyerId, buyStatus: false },
          { $set: { buyStatus: true, orderStatus: "Pending", orderDate: new Date() } }
        );
        
        console.log("Cart update result:", updateResult);
      } else {
        console.log("No pending cart items found for buyer:", buyerId);
      }
    } else if (req.body.event === "payment.failed") {
      console.log("Payment failed for order:", paymentDetails.order_id);
      // You can add failed payment handling logic here if needed
    }

    return res.status(200).send("Webhook received successfully");
  } catch (error) {
    console.error("Webhook error:", error);
    return res.status(500).send(error.message);
  }
};


// In payment.controllers.js
const updatePaymentStatus = async(req, res) => {
  try {
    const { orderId, paymentId } = req.body;
    
    // Update payment in database
    const payment = await paymentModel.findOne({ orderId });
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    
    payment.status = "captured";
    payment.paymentId = paymentId;
    await payment.save();
    
    // Update cart items
    const buyerId = payment.userId;
    const updateResult = await cartModel.updateMany(
      { buyerId, buyStatus: false },
      { $set: { buyStatus: true, orderStatus: "Pending", orderDate: new Date() } }
    );
    
    console.log("Manual payment update:", { 
      orderId, 
      paymentId, 
      cartItemsUpdated: updateResult.modifiedCount 
    });
    
    return res.status(200).json({ 
      message: "Payment status updated successfully",
      cartItemsUpdated: updateResult.modifiedCount
    });
  } catch (error) {
    console.error("Error updating payment status:", error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {makePayment , verifyPayment , updatePaymentStatus}