const express = require('express');
const router = express();

//import route
const transactionRoute = require('./transaction.route');

//endpoint home
router.get('/', (req, res) => {
  return res.send('backend for getpay');
});

router.use('/transactions', transactionRoute);

module.exports = router;
