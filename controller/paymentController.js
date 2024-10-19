require('dotenv').config();
const crypto = require('crypto')
const RazorPayInstance = require("../config/RazorpayConfig");
exports.createOrder = (req, res, next) => {
    // DO NOT ACCEPT AMOUNT FORM CLIENT\
    const { productId, price } = req.body;

    // course id se fetch krenge product ka data including its price;


    //create an order 
    const option = {
        amount: price * 100,  // price in samallest currency unit
        currency: "INR",
        receipt: " receipt_order_1"
    }
    try {
        RazorPayInstance.orders.create(option, (err, order) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "something went wrong"
                })
            } return res.status(200).json(order)
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "something went wrong"
        })
    }
}



exports.verifyPayment = (req, res, next) => {
    const { order_id, payment_id, signature } = req.body;

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