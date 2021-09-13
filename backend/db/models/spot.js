"use strict";
module.exports = (sequelize, DataTypes) => {
  const Spot = sequelize.define(
    "Spot",
    {
      userId: DataTypes.INTEGER,
      address: {
        type: DataTypes.STRING(100),
        validate: {
          len: [5, 100],
        },
      },
      city: {
        type: DataTypes.STRING(50),
        validate: {
          len: [5, 50],
        },
      },
      country: {
        type: DataTypes.STRING(50),
        validate: {
          len: [5, 50],
        },
      },
      lat: {
        type: DataTypes.DECIMAL,
        validate: {
          min: -90,
          max: 90,
        },
      },
      lng: {
        type: DataTypes.DECIMAL,
        validate: {
          min: -180,
          max: 180,
        },
      },
      name: {
        type: DataTypes.STRING(50),
        validate: {
          min: 2,
          max: 50,
        },
      },
      price: {
        type: DataTypes.DECIMAL,
        validate: {
          min: 0,
          max: 1000000,
        },
      },
    },
    {}
  );
  Spot.associate = function (models) {
    Spot.hasMany(models.Booking, { foreignKey: "spotId" });
    Spot.hasMany(models.Review, { foreignKey: "spotId" });
    Spot.hasMany(models.Image, { foreignKey: "spotId" });
    Spot.belongsTo(models.User, { foreignKey: "userId" });

  };
  return Spot;
};
