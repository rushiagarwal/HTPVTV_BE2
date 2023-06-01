'use strict'

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../Utils/Database')
const Config = require('../Config');

const User = sequelize.define('user', {
  id:{
    type:DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  user_sid: {
    type: Sequelize.UUID,
    allowNull: false,
    defaultValue: Sequelize.UUIDV4,
  },
  fullName: {
    type: DataTypes.STRING,
  },
  userName: {
    type: DataTypes.STRING
  },
  countryCode:{
    type:DataTypes.STRING
  },
  phoneNumber: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  },
  userType:{
    type: DataTypes.STRING,
    allowNull: false,
    //defaultValue: Config.APP_CONSTANTS.DATABASE.USER_TYPE.USER
  },
  gender: {
    type: DataTypes.STRING
  },
  dateOfBirth: {
    type: DataTypes.DATEONLY
  },
  profilePicURL:{
    type: DataTypes.STRING
  },
  verifyLink:{
    type: DataTypes.STRING(1000)
  },
  isEmailVerified:{
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  isPhoneVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  isBlocked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  bio: {
    type: DataTypes.TEXT
  },
  addressLine1: {
    type: DataTypes.TEXT,
  },
  addressLine2: {
    type: DataTypes.TEXT
  },
  city: {
    type:DataTypes.STRING
  },
  state: {
    type:DataTypes.STRING
  },
  FCMToken:{ 
    type:DataTypes.STRING
  },
  platform:{
    type:DataTypes.STRING
  },
  deviceId:{
    type:DataTypes.STRING
  },
  phoneOtpCode:{
    type:DataTypes.STRING
  },
  lastPhoneOtpSendDateTime: {
    type: DataTypes.DATE
  },
  phoneOtpCount:{
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  emailInviteToken: {
    type:DataTypes.STRING(2000)
  },
  accessToken:{
    type: DataTypes.STRING(2000)
  },
  refreshToken:{
    type: DataTypes.STRING(2000)
  },
  refreshTokenUpdatedDateTime:{
    type: DataTypes.DATE
  },
  status: {
    type: DataTypes.INTEGER,
    //defaultValue: Config.APP_CONSTANTS.DATABASE.STATUS_TYPES.ACTIVE
  }
},
{
  timestamps: true,
  freezeTableName: true,
  indexes: [{ fields: ['email'] }]
});

module.exports = User;