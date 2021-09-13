"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Reviews",
      [
        {
          userId: 2,
          spotId: 3,
          review: "This place is great!",
        },
        {
          userId: 3,
          spotId: 1,
          review: "This place sucks!",
        },
        {
          userId: 4,
          spotId: 1,
          review: "Never coming back.",
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      "Reviews",
      {
        spotId: { [Op.in]: [3, 1, 2] },
      },
      {}
    );
  },
};
