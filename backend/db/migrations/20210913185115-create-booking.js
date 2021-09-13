"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Bookings", {
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
      spotId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      startDate: {
        allowNull: false,
        type: Sequelize.DATE,
        validate: {
          customValidator(value) {
            if (value < Date.now()) {
              throw new Error("startDate can't be set in the past");
            }
          },
        },
      },
      endDate: {
        allowNull: false,
        type: Sequelize.DATE,
        validate: {
          customValidator(value) {
            if (value < Date.now()) {
              throw new Error("endDate can't be set in the past");
            }
          },
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
    return queryInterface.dropTable("Bookings");
  },
};
