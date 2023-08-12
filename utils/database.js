const Sequelize = require('sequelize');

const sequelize = new Sequelize('expenses', 'root', 'Monuking@12', {dialect: 'mysql', host: 'localhost'});

module.exports = sequelize;