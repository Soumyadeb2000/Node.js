const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/get-product', adminController.getProduct);

router.post('/post-product', adminController.postProduct);

router.delete('/delete-product/:id', adminController.deleteProduct);

module.exports = router;