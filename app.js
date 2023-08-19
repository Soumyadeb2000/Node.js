const express = require('express');

const User = require('./models/user');

const Expense = require('./models/expense');

const Order = require('./models/order')

const userRoutes = require('./router/user');

const expenseRoutes = require('./router/expense');

const purchaseRoutes = require('./router/purchase');

const premiumRoutes = require('./router/premium');

const passwordRoutes = require('./router/forgotpassword');

const sequelize = require('./utils/database');

const bodyParser = require('body-parser');

const cors = require('cors');

const app = express();

app.use(cors());

app.use(bodyParser.json({extended: false}));

app.use('/user', userRoutes);

app.use('/expense', expenseRoutes);

app.use('/purchase', purchaseRoutes);

app.use('/premium', premiumRoutes);

app.use('/password', passwordRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

sequelize.sync()
.then(() => {
    console.log("Server Online...");
    app.listen(3000);
})
.catch(err => console.log(err))