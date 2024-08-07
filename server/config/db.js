const { Sequelize } = require('sequelize');
const config = require('./config'); // Adjust the path as needed

module.exports= new Sequelize(config.development);