const express = require('express');
const router = express.Router();
const pm = require('../controllers/products');
const fileMngmt = require('../shared/fileMngmt')

router.get('/home', function(req, res, next){
    const filePath =fileMngmt.getHtmlFilePath('products-home.html'); 
    // c:\prjects\royal-crm\client\customers-home.html
    res.sendFile(filePath);
  })
  
router.get('/', pm.productsList);
router.post('/', pm.addProduct);
router.get('/export', pm.exportProducts);
router.put('/:id', pm.editProducts);
router.delete('/:id', pm.deleteProducts);
router.get('/search',pm.searchProducts);

module.exports=router;