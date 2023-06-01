'use strict'

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../Utils/Database')
const Config = require('../Config');

const GlobalConfig = sequelize.define('globalconfig', {
  id:{
    type:DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  config:{
    type: DataTypes.JSON
  }
},
{
  timestamps: true,
  freezeTableName: true
});

module.exports = GlobalConfig;