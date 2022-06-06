const express = require('express');
const router = express.Router();
const pm = require('../controllers/products');
const fileMgmt = require('../shared/fileMgmt');

router.get('/home', function(req, res, next){
  const filePath = fileMgmt.getHtmlFilePath('products-home.html');    // c:\prjects\royal-crm\client\customers-home.html
    res.sendFile(filePath);
  })
  
router.get('/', pm.productsList);
router.post('/', pm.addProduct);
router.get('/export', pm.exportProducts);
// router.patch('/', pm.editProducts);
// router.delete('/', pm.deleteProducts);
// router.get('/search',pm.searchProducts);

module.exports=router;