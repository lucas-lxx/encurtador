const Sequelize = require('sequelize');

const sequelize = require('../database/database');

const Link = sequelize.define(
  'links',
  {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      defaultValue: Sequelize.UUIDV1,
      unique: true,
      primaryKey: true
    },
    original_link: {
      type: Sequelize.STRING,
      allowNull: false
    },
    short_link: {
      type: Sequelize.STRING,
      allowNull: false
    },
    last_click: {
      type: Sequelize.DATE,
      allowNull: false
    },
    clicks: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    }
  }
);

module.exports = Link;