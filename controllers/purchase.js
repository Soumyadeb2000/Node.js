const Razorpay = require('razorpay');

const Order = require('../models/order');

const jwt = require('jsonwebtoken');

function generateAccessToken (user, premium) {
    return jwt.sign({user: user, isPremium: premium}, '9453565636banku');
}

exports.purchasePremium = (req, res, reject) => {
    try {
        const rzp = new Razorpay({
            key_id: 'rzp_test_6oDul5ZsQ2fJe7',
            key_secret: 'fRZSbLYjlKikpKMksuUaqCcY'
        })
        const amount = 2500;
        
        rzp.orders.create({amount, currency: "INR"}, async (err, order) => {
            if(err) {
                console.log(err);
                return res.status(500).json({Error: err})
            }
            await req.user.createOrder({orderId: order.id, status: "Pending"});
            return res.status(201).json({order, key_id: rzp.key_id})

        })
    } catch (error) {
        console.log(error);
    }
}

exports.updateTransactionStatus = async (req, res, next) => {
    try { 
        console.log(req.user.isPremium);
        const orderId = req.body.orderId;
        const updatedPaymentId = req.body.paymentId;
        const status = req.body.status;
        const orders = await Order.findAll({where: {orderId: orderId}});
        const order = orders[0];
        if(status === "SUCCESSFUL") {
            const promise1 = order.update({paymentId: updatedPaymentId, status: status});
            const promise2 = req.user.update({isPremium: true}); 
            await Promise.all([promise1, promise2]);
            return res.status(201).json({status: "Transaction successful", token: generateAccessToken(req.user)});
        }
        else {
            const promise1 = order.update({paymentId: updatedPaymentId, status: status});
            const promise2 = req.user.update({isPremium: false}); 
            await Promise.all([promise1, promise2]);
            return res.json({status: "Transaction failed"});
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({err: "Server error"});
    }

}