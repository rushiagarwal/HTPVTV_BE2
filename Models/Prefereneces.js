"use strict";

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../Utils/Database");
const Config = require("../Config");
const User = require("./Users");

const Preferenece = sequelize.define("preference",{
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    isProfilePublic: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isDarkTheme: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isNotificationOn: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
  }
);

Preferenece.belongsTo(User);
User.hasOne(Preferenece);

module.exports = Preferenece;
