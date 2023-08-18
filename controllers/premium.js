const User = require('../models/user');

const Expense = require('../models/expense');

exports.leaderboards = async (req, res) => {
    try {
        var userTotalExpense = {};
        const users = await User.findAll();
        const leaderboardDetails = [];
        const expenses = await Expense.findAll();
        expenses.forEach(expense => {
            if(userTotalExpense[expense.userId]) {
                userTotalExpense[expense.userId] = userTotalExpense[expense.userId] + expense.amount;
            }
            else {
                userTotalExpense[expense.userId] = expense.amount;
            }
        });
        console.log(userTotalExpense);
        
        users.forEach(user => {
            // console.log(user.id);
            leaderboardDetails.push({name: user.name, amount: userTotalExpense[user.id]});
        });
        leaderboardDetails.sort((a,b) => b.amount - a.amount);
        console.log(leaderboardDetails);
        res.status(201).json(leaderboardDetails);
    } catch (error) {
        console.log(error);
        res.status(500).json({Error: 'Something went wrong'});
    }
    
}
