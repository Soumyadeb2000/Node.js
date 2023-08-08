const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const expenses = sequelize.define('expenses', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true
    },

    amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false
    },

    description: {
        type: Sequelize.STRING
    },

    category: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = expenses;