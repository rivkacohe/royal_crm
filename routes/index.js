const express = require('express');
const router = express.Router();
const customersModule = require('../controllers/customers');
const productsModule =require('../controllers/products');
const ordersModule =require('../controllers/orders');
/* GET home page. */
router.get('/customers', customersModule.customersList); 

router.get('/products',productsModule.productsList);

router.get('/orders', ordersModule.ordersList);

module.exports = router;
