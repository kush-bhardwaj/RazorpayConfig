require('dotenv').config({});
const razorpay = require('razorpay');
const RazorPayInstance = ()=>{
    return new razorpay({
        key_id:process.env.RAZORPAY_KEY_ID,
        key_secret:process.env.RAZORPAY_SECRET_KEY
    })
}

module.exports = RazorPayInstance;