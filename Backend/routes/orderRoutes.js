const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');
const { addOrderItems, getMyOrders, getOrders, updateOrderStatus } = require('../controller/orderController');

const router = express.Router();

router.post('/', protect, addOrderItems);
router.get('/myorders', protect, getMyOrders);
router.get('/', protect, admin, getOrders);
router.put('/:id', protect, admin, updateOrderStatus);

module.exports = router;