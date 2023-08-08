const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./utils/database');
const route = require('./routes/userRoute')
const cors = require('cors');
const app = express();

app.use(bodyParser.json({extended: false}));

app.use(cors());

// app.put('/user/update-expense/:id', async (req, res, next) => {
//     try {
//         const amount = req.body.newExpenseData.amount;
//         const description = req.body.newExpenseData.description;
//         const category = req.body.newExpenseData.category;
//         const id = req.params.id;
//         const expense = await Expense.findByPk(id)
//         expense.amount = amount;
//         expense.description = description;
//         expense.category = category;
//         await expense.save();
//         res.status(201).json({res: "updated sucessfully"});
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({err: "Something went wrong!"});
//     }
// })

app.use('/user', route);
  
sequelize.sync()
.then(res => {
    console.log("server running on 3000");
    app.listen(3000);
})
.catch(err => {
    console.log(err);
})