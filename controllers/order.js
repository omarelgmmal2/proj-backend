const Order = require('../models/order');

const addOrder = async(req,res,next)=>{
    const { products,user } = req.body;
    const newOrder = new Order({
        products:products,
        user:user
    })
    await newOrder.save()
    .then(()=>{
      res.status(201).json({ status : "SUCCESS" ,Product : newOrder})
      console.log(newOrder)
    })
    .catch((err)=>{console.log(err)})
}

const getOrder = async(req,res,next)=>{
    try {
        const orderId = req.params.productId;
        const order = await Order.findById(orderId);
        if (!order) {
          return res.status(404).json({ message: 'order not found' });
        }
        res.json(order);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

const getOrders = async(req,res,next)=>{
    try {
        const orders = await Order.find();
        res.json(orders);
    }catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    addOrder,
    getOrder,
    getOrders
}