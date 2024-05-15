const express = require('express');
const product = require('../controllers/product');
const router = express.Router();

router.post('/add_product' , product.addProduct)
router.get('/get_products' , product.getProducts)
router.get('/get_product/:productId' , product.getProduct)
router.delete('/delete_product',product.deleteProduct)
router.put('/edit_product' , product.editProduct)
router.put('/add_product_quantity' , product.addProductQuantity)

module.exports = router;