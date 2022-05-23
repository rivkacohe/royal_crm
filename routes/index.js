const express = require('express');
const router = express.Router();
const cm = require('../controllers/customers');
const pm = require('../controllers/products');
const ordersModule = require('../controllers/orders');
const path = require('path');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('this is the home page. use /customers /products or /orders.')
});

router.get('/chat', function(req, res, next){
  const filePath = path.join(__dirname, '../client', 'chat.html'); 
  // c:\prjects\royal-crm\client\customers-home.html
  res.sendFile(filePath);
})




/* orders */


module.exports = router;