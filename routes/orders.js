const express = require('express');
const router = express.Router();
const om = require('../controllers/orders');
const path = require('path');

router.get('/home', function(req, res, next){
    const filePath = path.join(__dirname, '../client', 'orders-home.html'); 
    // c:\prjects\royal-crm\client\customers-home.html
    res.sendFile(filePath);
  })
router.get('/', om.ordersList);
router.post('/', om.addOrder);
router.get('/export', om.exportOrders);
router.get('/search',om.searchOrders);

module.exports=router;