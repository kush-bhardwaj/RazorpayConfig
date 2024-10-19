const express = require('express');
const { createOrder, verifyPayment } = require('../controller/paymentController');
const PaymentRoute = express.Router()
PaymentRoute.post('/createorder', createOrder);
PaymentRoute.post('/verifypayment', verifyPayment);

module.exports = PaymentRoute;