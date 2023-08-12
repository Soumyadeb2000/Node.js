const sequelize = require('../utils/database');

const Sequelize = require('sequelize');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },

    name: {type: Sequelize.STRING},

    email: {
        type: Sequelize.STRING,
        unique: true
    },    
    password: {
        type: Sequelize.STRING,
        unique: true
    }    
})

module.exports = User;