const Expense = require('../models/expense');

exports.deleteExpense = async (req, res, next) => {
    try {
        const eid = req.params.id;
        if(eid === 'undefined' || eid === 'null' || eid === '') {
            console.log("Invalid id");
            res.status(500).json({err: "Invalid id"});
        }
        await Expense.destroy({where: {id: eid, userId: req.user.id}});
        res.status(201).json({res: "Deletion successful"});
        
    } catch (error) {
        console.log(("Something went wrong!"));
        res.status(500).json({err: "Something went wrong!"})
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
        const data = await Expense.create({amount: amount, category: category, description: description, userId: req.user.id});
        return res.status(200).json({newExpenseData: data});
    } catch (error) {
        console.log(error);
        return res.status(500).json({Error: "Something went wrong"})
    }

}
