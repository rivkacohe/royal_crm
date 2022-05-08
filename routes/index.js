const express = require('express');
const router = express.Router();
const customersModule = require('../controllers/customers');
const productsModule =require('../controllers/products');
const ordersModule =require('../controllers/orders');
/* GET home page. */
router.get('/', function(req, res, next) {
 customersModule.addCustomer('Lola','0522222','hi@gmail.com',1);
 customersModule.customersList(req,res);
});

router.get('/products', function(req, res, next) {
  productsModule.addProduct('Good Product','A very good product',50);
  productsModule.productsList(req,res);
 });

 router.get('/orders', function(req, res, next) {
  ordersModule.addOrder(1,1,50,3);
  ordersModule.ordersList(req,res);
 });

module.exports = router;
