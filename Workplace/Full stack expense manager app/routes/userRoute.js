const express = require('express');

const router = express.Router();

const controller = require('../controllers/userController')

router.delete('/delete-expense/:id', controller.deleteExpense);

router.get('/get-expense', controller.getExpense);

router.post('/add-expense', controller.addExpense);

module.exports = router;