const adminController = require('../controllers/admin');

const express = require('express');

const router = express.Router();

router.delete('/delete-product/:id', adminController.deleteProduct);

router.get('/get-product', adminController.getProduct);

router.post('/add-product', adminController.addProduct);

module.exports = router;