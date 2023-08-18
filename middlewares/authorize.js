const User = require('../models/user')

const jwt = require('jsonwebtoken');

exports.Authenticate = (req, res ,next) => {
    try {
        const token = req.header('Authorization');
        const login = jwt.verify(token, '9453565636banku');
        User.findByPk(login.user.id)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => {
            console.log(err);
        })
    } catch (error) {
        return res.status(500).json({Error: "Something went"});
    }
}