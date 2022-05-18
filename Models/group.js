const Sequelize = require('sequelize');
const sequelize = require('../DB/database');

const grouptable = sequelize.define('Groups',{
    grpId:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    grpName:{
        type:Sequelize.STRING,
        allowNull: false,
        unique: true
    }
});

module.exports = grouptable;