const User = require('../models/user');

exports.leaderboards = async (req, res, next) => {
    try {
        var leaderboard = await User.findAll({
            attributes: ['name', 'totalExpense'],
            order: [['totalExpense', 'DESC']]
        });
        res.status(201).json(leaderboard);
    } catch(error) {  
        res.status(500).json({Error: error});
    }
}
