const express = require('express');
const order = require('../controllers/order');
const router = express.Router();

router.post('/add_order',order.addOrder)
router.get('/get_order/:orderId',order.getOrder)
router.get('/get_orders',order.getOrders)

module.exports = router;