'use strict'

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../Utils/Database')
const Config = require('../Config');
const User = require('./Users');

const Connection = sequelize.define('connection', {
  id:{
    type:DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  receiveNotification:{
      type: DataTypes.BOOLEAN,
      defaultValue: false
  }
},
{
    timestamps: true,
    freezeTableName: true
});

Connection.belongsTo(User,{as: "user"});
Connection.belongsTo(User,{as: "follower"});


module.exports = Connection;