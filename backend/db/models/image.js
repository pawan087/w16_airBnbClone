"use strict";
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    "Image",
    {
      spotId: DataTypes.INTEGER,
      url: {
        type: DataTypes.STRING(500),
        validate: {
          len: [5, 500],
          isNotUrl(value) {
            if (!Validator.isUrl(value)) {
              throw new Error("Must be a valid url.");
            }
          },
        },
      },
    },
    {}
  );
  
  Image.associate = function (models) {
    // associations can be defined here
  };
  return Image;
};
