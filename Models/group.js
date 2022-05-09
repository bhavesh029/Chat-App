const Sequelize = require('sequelize');

const sequelize = require('../DB/database');

const group = sequelize.define('group', {
    grpId:{
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    grpName:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
})

module.exports = group;