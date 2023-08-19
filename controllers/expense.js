const Expense = require('../models/expense');

const User = require('../models/user');

exports.deleteExpense = async (req, res, next) => {
    try {
        const eid = req.params.id;
        if(eid === 'undefined' || eid === 'null' || eid === '') {
            console.log("Invalid id");
            return res.status(500).json({err: "Invalid id"});
        }
        
        const expenseToBeDeleted = await Expense.findAll({where: {id: eid, userId: req.user.id}})
        const expenseAmountToBeDeleted = Number(expenseToBeDeleted[0].amount);
        console.log(expenseAmountToBeDeleted);
        const users = await User.findAll({where: {id: req.user.id}});
        const user = users[0];
        const updatedTotalExpense = Number(user.totalExpense) - expenseAmountToBeDeleted;
        console.log(updatedTotalExpense);
        await user.update({totalExpense: updatedTotalExpense})
        await Expense.destroy({where: {id: eid, userId: req.user.id}});
        return res.status(201).json({res: "Deletion successful", asn: expenseToBeDeleted});
        
    } catch (error) {
        console.log(("Something went wrong!"));
        return res.status(500).json({err: "Something went wrong!"})
    }
}    

exports.getExpenses = (req, res, next) => {
    Expense.findAll({where: {userId: req.user.id}})
    .then(expense => {
        return res.status(200).json({expenses: expense});
    })
    .catch(err => {
        console.log(err);
        return res.status(404).json({error: "Data not found!"})
    })
}

exports.postExpense = async (req, res, next) => {
    try {
        const amount = req.body.amount;
        const category = req.body.category;
        const description = req.body.description;
        const users = await User.findAll({where: {id: req.user.id}});
        const user = users[0];
        const currentTotalExpense = Number(user.totalExpense) + Number(amount);
            await user.update({
                totalExpense: currentTotalExpense
            });
        const data = await Expense.create({amount: amount, category: category, description: description, userId: req.user.id});
        return res.status(200).json({newExpenseData: data});    
    } catch (error) {
        console.log(error);
        return res.status(500).json({Error: "Something went wrong"})
    }

}
