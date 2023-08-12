const express = require('express');

const User = require('./models/user');

const sequelize = require('./utils/database');

const bodyParser = require('body-parser');

const bcrypt = require('bcrypt');

const cors = require('cors');

const app = express();

app.use(cors());

app.use(bodyParser.json({extended: false}));

app.post('/user/signup', async (req, res, next) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        if(email)
        bcrypt.hash(password, 10, async (err, hash) => {
            if(!err) {
                const data = await User.create({name: name, email: email, password: hash});
                res.status(200).json({newUserData: data});
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({Error: 'Something went wrong'});
    }
})

app.post('/user/login', async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const users = await User.findAll({where: {email: email}})
        const user = users[0];
        if(user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if(result === true)
                res.status(200).json({message: "User login successful", success: true});
                if(err)
                res.status(401).json({Error: "User not authorized", success: false});
            })      
        }
    }
    catch (error) {
        res.status(404).json({Error: "User not found!"})
    }
});

sequelize.sync()
.then(() => {
    console.log("Server Online...");
    app.listen(3000);
})
.catch(err => console.log(err));