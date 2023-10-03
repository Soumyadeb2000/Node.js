const sequelize = require('../utils/database');
const Sequelize = require('sequelize')

const Product = sequelize.define('products', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },

    price: {
        type: Sequelize.INTEGER,
        allowNull: false
    },    

    product: {
        type: Sequelize.STRING,
        allowNull: false
    },

    category: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Product;