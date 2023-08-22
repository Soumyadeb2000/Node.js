const User = require('../models/user')

const jwt = require('jsonwebtoken');



exports.Authenticate = async (req, res ,next) => {
    try {
        const token = req.header('Authorization');
        const login = jwt.verify(token, '9453565636banku');
        const user = await User.findByPk(login.user.id)
        req.user = user;
        next();
    } catch (error) {
        return res.status(500).json({Error: "Something went"});
    }
}