const Sequelize = require('sequelize');
const sequelize = require('../DB/database');

const userGroups = sequelize.define('UserGroups',{
    id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    isAdmin:{
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
});

module.exports = userGroups;