const Expense = require('../model/expenses');

exports.deleteExpense = async (req, res, next) => {
    try {
        const eid = req.params.id;
        if(eid === 'undefined' || eid === 'null' || eid === '') {
            console.log("Invalid id");
            res.status(500).json({err: "Invalid id"});
        }
        await Expense.destroy({where: {id: eid}});
        res.status(201).json({res: "Deletion successful"});
        
    } catch (error) {
        console.log(("Something went wrong!"));
        res.status(500).json({err: "Something went wrong!"})
    }
}

exports.getExpense = (req, res, next) => {
    Expense.findAll()
    .then(expense => {
        res.status(200).json({expenses: expense})
    })
    .catch(err => {
        console.log(err);
        res.status(404).json({error: "Data not found!"})
    })
}

exports.addExpense = async (req, res, next) => {
    try {
        const amount = req.body.amount;
        const description = req.body.description;
        const category = req.body.category;
        console.log(amount, description, category)
        const data = await Expense.create({amount: amount, description: description, category: category})
        res.status(201).json({newExpenseData: data})
    } catch (err) {
        console.log(err);
        res.status(500).json({err: "Something went wrong :("})
    }
}