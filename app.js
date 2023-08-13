const express = require('express');

const User = require('./models/user');

const Expense = require('./models/expense');

const userRoutes = require('./router/user');

const expenseRoutes = require('./router/expense');

const sequelize = require('./utils/database');

const bodyParser = require('body-parser');

const cors = require('cors');

const app = express();

app.use(cors());

app.use(bodyParser.json({extended: false}));

app.use('/user', userRoutes);

app.use('/expense', expenseRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

sequelize.sync()
.then(() => {
    console.log("Server Online...");
    app.listen(3000);
})
.catch(err => console.log(err))