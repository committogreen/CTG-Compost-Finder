const { Sequelize } = require('sequelize');
const config = require('./config.js'); // Adjust the path as needed
const parsedConfig = JSON.parse(JSON.stringify(config));

module.exports= new Sequelize(parsedConfig.development);