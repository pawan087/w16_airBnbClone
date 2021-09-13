'use strict';
module.exports = (sequelize, DataTypes) => {
  const Spot = sequelize.define('Spot', {
    userId: DataTypes.INTEGER,
    address: DataTypes.STRING(100),
    city: DataTypes.STRING(50),
    country: DataTypes.STRING(50),
    lat: DataTypes.DECIMAL,
    lng: DataTypes.DECIMAL,
    name: DataTypes.STRING(50),
    price: DataTypes.DECIMAL
  }, {});
  Spot.associate = function(models) {
    // associations can be defined here
  };
  return Spot;
};
