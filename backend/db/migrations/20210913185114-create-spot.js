"use strict";

const { Validator } = require("sequelize");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Spots", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Users" },
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
      city: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },
      country: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },
      lat: {
        type: Sequelize.DECIMAL,
      },
      lng: {
        type: Sequelize.DECIMAL,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },
      price: {
        allowNull: false,
        type: Sequelize.DECIMAL,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Spots");
  },
};
