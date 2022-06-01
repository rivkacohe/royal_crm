const express = require('express');
const router = express.Router();
const cm = require('../controllers/customers');
const pm = require('../controllers/products');
const ordersModule = require('../controllers/orders');
const path = require('path');
const mwAuth = require('../middleware/auth');
const auth = require('../controllers/auth')
const fileMngmt = require('../shared/fileMngmt')



/* authentication */
router.get('/signin', function (req, res, next) {
  const filePath =fileMngmt.getHtmlFilePath('login.html');
  res.sendFile(filePath);
});

router.post('/login', auth.login);

router.get('/logout', mwAuth, function (req, res, next) {
  return res
    .clearCookie('access_token')
    .status(200)
    .send('Successfully logged out.');
})


/* GET home page. */
router.get('/',mwAuth, function (req, res, next) {
  res.send('this is the home page. use /customers /products or /orders.')
});

router.get('/chat',mwAuth, function(req, res, next){
  const filePath = fileMngmt.getHtmlFilePath('login.html'); 
  // c:\prjects\royal-crm\client\customers-home.html
  res.sendFile(filePath);
})




/* orders */


module.exports = router;