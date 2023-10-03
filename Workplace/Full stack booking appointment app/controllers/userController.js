const User = require('../models/User');

exports.postUser = async (req, res, next) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const phone = req.body.phone;
        const data = await User.create({name: name, phone: phone, email: email});
        res.status(201).json({newUserData: data})
        
    } catch (error) {
        console.log(error);
    }
}

exports.getUser = async (req, res, next) => {
        await User.findAll()
        .then((users) => {
            res.status(200).json({Users: users});
        })
        .catch((err) => {
        console.log(err);
        })
}


exports.deleteUser = async (req, res, next) => {
    try {
        const uid = req.params.id;
        if(uid === 'undefined' || uid === null) {
            res.status(500).json({error: 'ID is missing'})
        }
        await User.destroy({where: {id: uid}});
        res.status(201).json({res: 'Successfully deleted'});
    } catch (err) {
        console.log(err);
    }
}