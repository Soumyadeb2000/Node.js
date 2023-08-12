const express = require('express');

const User = require('./models/user');

const sequelize = require('./utils/database');

const bodyParser = require('body-parser');

const cors = require('cors');

const app = express();

app.use(cors());

app.use(bodyParser.json({extended: false}));

app.post('/user/signup', async (req, res, next) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const data = await User.create({name: name, email: email, password: password});
        res.status(200).json({newUserData: data});
    } catch (error) {
        console.log(error);
        res.status(500).json({Error: 'Something went wrong'});
    }
})

app.post('/user/login', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findAll({where: {email: email}})
    .then(users => {
        const user = users[0];
        if(user) {
           if(user.password === password)
           res.status(200).json({message: "User login successful", success: true});
           else
           res.status(401).json({Error: "User not authorized", success: false});
        }
        else {
            res.status(404).json({Error: "User not found!"})
        }
    })
    .catch(err => {
        console.log(err);
        res.status(404).json({Error: "User not found!"})
    })
});

sequelize.sync()
.then(() => {
    console.log("Server Online...");
    app.listen(3000);
})
.catch(err => console.log(err));