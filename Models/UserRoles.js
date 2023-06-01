'use strict'

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../Utils/Database')
const Config = require('../Config');
const User = require('./Users');

const UserRoles = sequelize.define('userroles', {
  id:{
    type:DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  userType:{
    type: DataTypes.STRING,
    //defaultValue: Config.APP_CONSTANTS.DATABASE.USER_TYPE.USER
  },
  status: {
    type: DataTypes.INTEGER,
    //defaultValue: Config.APP_CONSTANTS.DATABASE.STATUS_TYPES.ACTIVE
  }
},
{
  timestamps: true,
  freezeTableName: true,
  indexes: [{ fields: ['userType'] }]
});

UserRoles.belongsTo(User);
User.hasMany(UserRoles);

module.exports = UserRoles;