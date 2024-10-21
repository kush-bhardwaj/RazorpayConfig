require('dotenv').config();
const crypto = require('crypto')
// const RazorPayInstance = require("../config/RazorpayConfig");
const RazorPayInstance = require('../config/RazorpayConfig')
// console.log("hello",RazorPayInstance())
exports.createOrder = (req, res, next) => {
    // DO NOT ACCEPT AMOUNT FORM CLIENT\
    const { productId, price } = req.body;

    // Validate price and productId
    if (!productId || !price || isNaN(price) || price <= 0) {
        return res.status(400).json({
            success: false,
            message: "Invalid product ID or price."
        });
    }

    // course id se fetch krenge product ka data including its price;
    // console.log(price , productId)

    //create an order 
    const option = {
        amount: price * 100,  // price in samallest currency unit
        currency: "INR",
        receipt: " receipt_order_1"
    }
    // console.log(option)
    RazorPayInstance().orders.create(option, (err, order) => {
        console.log("hello")
            if (err) {
                console.log("razorPay error", err)
                return res.status(500).json({
                    success: false,
                    message: "something went wrong"
                })
            } return res.status(200).json(order)
        })
}



exports.verifyPayment = (req, res, next) => {
    const { order_id, payment_id, signature } = req.body;
    console.log("order id" ,order_id)

    const secretKey = process.env.RAZORPAY_SECRET_KEY;

    const hmac = crypto.createHmac('sha256', secretKey);

    hmac.update(order_id + "|" + payment_id);

    const genretedSignature = hmac.digest('hex');
    if(genretedSignature === signature){
        return res.status(200).json({
            success:true,
            message:"payment verfied"
        });
    }else{
        return res.status(500).json({
            success:false,
            message:'payment not verified'
        })
    }

}