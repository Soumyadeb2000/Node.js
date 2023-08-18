const User = require('../models/user');

const Expense = require('../models/expense');

const Sequelize = require('sequelize');

exports.leaderboards = async (req, res, next) => {
    try {
        var leaderboard = await User.findAll({
            attributes: ['id', 'name', [Sequelize.fn('sum', Sequelize.col('expenses.amount')), 'totalExpense']],
            include: [
                {
                    model: Expense,
                    attributes: []
                }
            ],
            group: ['user.id'],
            order: [['totalExpense', 'DESC']]
        });
        console.log(leaderboard);
        res.status(201).json(leaderboard);
    } catch(error) {  
        console.log(error);
        res.status(500).json({Error: error});
    }
}
