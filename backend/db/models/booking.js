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
    Booking.belongsTo(models.User, { foreignKey: "userId" });
    Booking.belongsTo(models.Spot, { foreignKey: "spotId" });
  };
  return Booking;
};
