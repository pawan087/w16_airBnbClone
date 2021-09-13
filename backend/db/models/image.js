'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    spotId: DataTypes.INTEGER,
    url: DataTypes.STRING(500)
  }, {});
  Image.associate = function(models) {
    // associations can be defined here
  };
  return Image;
};
