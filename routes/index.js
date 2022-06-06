const express = require('express');
const router = express.Router();
const mwAuth = require('../middleware/auth');
const auth = require('../controllers/auth');
const fileMgmt = require('../shared/fileMgmt');

/* authentication */
router.get('/signin', function (req, res, next) {
  const filePath = fileMgmt.getHtmlFilePath('login.html');
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
router.get('/', function (req, res, next) {
  res.send('this is the home page. use /customers /products or /orders.')
});

router.get('/chat', function(req, res, next){
  const filePath = fileMgmt.getHtmlFilePath('chat.html');
  // c:\prjects\royal-crm\client\customers-home.html
  res.sendFile(filePath);
})




/* orders */


module.exports = router;