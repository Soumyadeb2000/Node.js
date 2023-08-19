const Expense = require('../models/expense');

const User = require('../models/user');

const sequelize = require('../utils/database');

exports.deleteExpense = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        const eid = req.params.id;
        if(eid === 'undefined' || eid === 'null' || eid === '') {
            console.log("Invalid id");
            return res.status(500).json({err: "Invalid id"});
        }
        const expenseToBeDeleted = await Expense.findAll({where: {id: eid, userId: req.user.id}})
        const expenseAmountToBeDeleted = Number(expenseToBeDeleted[0].amount);
        const users = await User.findAll({where: {id: req.user.id}});
        const updatedTotalExpense = Number(users[0].totalExpense) - expenseAmountToBeDeleted;
        await users[0].update({totalExpense: updatedTotalExpense}, {transaction: t})
        await Expense.destroy({where: {id: eid, userId: req.user.id}, transaction: t});
        await t.commit();
        return res.status(201).json({res: "Deletion successful"});
        
    } catch (error) {
        await t.rollback();
        return res.status(500).json({err: "Something went wrong!"})
    }
}    

exports.getExpenses = async (req, res, next) => {
    try {
        const expenses = await Expense.findAll({where: {userId: req.user.id}})
        return res.status(200).json({expenses: expenses});
    } catch (error) {
        return res.status(404).json({error: "Data not found!"})
    }

}

exports.postExpense = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        const amount = req.body.amount;
        const category = req.body.category;
        const description = req.body.description;
        const users = await User.findAll({where: {id: req.user.id}});
        const user = users[0];
        const currentTotalExpense = Number(user.totalExpense) + Number(amount);
            await user.update({
                totalExpense: currentTotalExpense
            }, {transaction: t});
        const data = await Expense.create({amount: amount, category: category, description: description, userId: req.user.id}, {transaction: t});
        await t.commit();
        return res.status(200).json({newExpenseData: data});    
    } catch (error) {
        await t.rollback();
        return res.status(500).json({Error: "Something went wrong"})
    }

}
