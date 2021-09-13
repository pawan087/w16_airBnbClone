"use strict";
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define(
    "Review",
    {
      userId: DataTypes.INTEGER,
      spotId: DataTypes.INTEGER,
      review: {
        type: DataTypes.STRING(1000),
        validate: {
          len: [5, 1000],
        },
      },
    },
    {}
  );
  Review.associate = function (models) {
    Review.belongsTo(models.User, { foreignKey: "userId" });
  };
  return Review;
};
