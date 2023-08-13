const express = require('express');

const User = require('./models/user');

const Expense = require('./models/expense');

const sequelize = require('./utils/database');

const bodyParser = require('body-parser');

const cors = require('cors');

const bcrypt = require('bcrypt');

const app = express();

app.use(cors());

app.use(bodyParser.json({extended: false}));

app.delete('/expense/delete-expense/:id', async (req, res, next) => {
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
})

app.get('/expense/get-expense', (req, res, next) => {
    Expense.findAll()
    .then(expense => {
        res.status(200).json({expenses: expense})
    })
    .catch(err => {
        console.log(err);
        res.status(404).json({error: "Data not found!"})
    })
})

app.post('/expense/add-expense', async (req, res, next) => {
    try {
        const amount = req.body.amount;
        const category = req.body.category;
        const description = req.body.description;
        const data = await Expense.create({amount: amount, category: category, description: description});
        res.status(200).json({newExpenseData: data});
    } catch (error) {
        console.log(error);
        res.status(500).json({Error: "Something went wrong"})
    }

})



app.post('/user/signup', (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    bcrypt.hash(password, 10, async (err, hash) => {
        try {
            const data = await User.create({name: name, email: email, password: hash});
            res.status(200).json({newUserData: data});
        } catch (error) {
            console.log(error);
        res.status(500).json({Error: 'User with similar email exists'});
        }
        
    })
})

app.post('/user/login', async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const users = await User.findAll({where: {email: email}});
        const user = users[0];
        if(user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if(result === true) {
                    res.status(200).json({Message: "User login sucessful"});
                }
                else {
                    res.status(401).json({Error: "User not authorized"});
                }
            })
        }
        else {
            res.status(404).json({Error: "User not found"});
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({Error: "Something went wrong"});
    } 
})

sequelize.sync()
.then(() => {
    console.log("Server Online...");
    app.listen(3000);
})
.catch(err => console.log(err))