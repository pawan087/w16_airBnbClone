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
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING(100),
        validate: {
          len: [5, 100],
        },
      },
      city: {
        allowNull: false,
        type: Sequelize.STRING(50),
        validate: {
          len: [5, 50],
        },
      },
      country: {
        allowNull: false,
        type: Sequelize.STRING(50),
        validate: {
          len: [5, 50],
        },
      },
      lat: {
        type: Sequelize.DECIMAL,
        validate: {
          min: -90,
          max: 90,
        },
      },
      lng: {
        type: Sequelize.DECIMAL,
        validate: {
          min: -180,
          max: 180,
        },
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(50),
        validate: {
          len: [2, 50],
        },
      },
      price: {
        allowNull: false,
        type: Sequelize.DECIMAL,
        validate: {
          min: 0,
          max: 1000000,
        },
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
