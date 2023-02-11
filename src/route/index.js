const express = require('express');
const router = express();

//import route
const transactionRoute = require('./transaction.route');
const userRoute = require('./user.route.js');

//endpoint home
router.get('/', (req, res) => {
  return res.send('backend for getpay');
});

//using route
router.use('/transactions', transactionRoute);
router.use('/users', userRoute);

module.exports = router;
