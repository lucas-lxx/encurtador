const Sequelize = require('sequelize');

const sequelize = require('../database/database');

const Link = sequelize.define(
  'links',
  {
    short_link: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true
    },
    original_link: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    last_click: {
      type: Sequelize.DATE,
      defaultValue: null
    },
    clicks: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    }
  }
);

module.exports = Link;