// const razorpay = require('razorpay');
// const Order = require('../model/Order');
// const Product = require('../model/Product');

// let razorpayInstance;
// if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
//   razorpayInstance = new razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID,
//     key_secret: process.env.RAZORPAY_KEY_SECRET
//   });
// }

// const createPaymentOrder = async (req, res) => {
//   try {
//     if (!razorpayInstance) {
//       return res.status(500).json({ message: 'Payment service not configured' });
//     }
//     const { amount } = req.body;
//     const options = {
//       amount: amount * 100,
//       currency: 'INR',
//       receipt: `receipt_${Date.now()}`
//     };
//     const order = await razorpayInstance.orders.create(options);
//     res.json(order);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const verifyPayment = async (req, res) => {
//   try {
//     if (!razorpayInstance) {
//       return res.status(500).json({ message: 'Payment service not configured' });
//     }
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderData } = req.body;
    
//     const crypto = require('crypto');
//     const generatedSignature = crypto
//       .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
//       .update(razorpay_order_id + '|' + razorpay_payment_id)
//       .digest('hex');

//     if (generatedSignature === razorpay_signature) {
//       const order = new Order({
//         userId: req.user._id,
//         items: orderData.items,
//         totalAmount: orderData.totalAmount,
//         address: orderData.address,
//         paymentId: razorpay_payment_id
//       });
//       const createdOrder = await order.save();
//       res.json({ success: true, order: createdOrder });
//     } else {
//       res.status(400).json({ success: false, message: 'Payment verification failed' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// module.exports = { createPaymentOrder, verifyPayment };