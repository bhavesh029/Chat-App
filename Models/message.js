const Sequelize = require('sequelize');
const sequelize = require('../DB/database');

const message = sequelize.define('message', {
    id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    Username:{
        type: Sequelize.STRING,
        allowNull: false
    },
    message: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = message;