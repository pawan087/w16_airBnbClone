"use strict";
module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define(
    "Booking",
    {
      userId: DataTypes.INTEGER,
      spotId: DataTypes.INTEGER,
      startDate: {
        type: DataTypes.DATE,
        validate: {
          customValidator(value) {
            if (value < Date.now()) {
              throw new Error("startDate can't be set in the past");
            }
          },
        },
      },
      endDate: {
        type: DataTypes.DATE,
        validate: {
          customValidator(value) {
            if (value < Date.now()) {
              throw new Error("endDate can't be set in the past");
            }
          },
        },
      },
    },
    {}
  );
  
  Booking.associate = function (models) {
    // associations can be defined here
  };
  return Booking;
};
