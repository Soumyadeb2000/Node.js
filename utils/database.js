const Sequelize = require('sequelize');

require('dotenv').config();

const sequelize = new Sequelize('expenses', 'root', process.env.SEQUELIZE_ROOT_PASSWORD, {dialect: 'mysql', host: 'localhost'});

module.exports = sequelize;