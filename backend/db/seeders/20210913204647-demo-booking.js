"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    let oldDateObj = new Date();
    let newDateObj = new Date();

    newDateObj.setTime(oldDateObj.getTime() + 10080 * 60 * 1000);

    return queryInterface.bulkInsert(
      "Bookings",
      [
        {
          userId: 2,
          spotId: 3,
          startDate: oldDateObj,
          endDate: newDateObj,
        },
        {
          userId: 3,
          spotId: 1,
          startDate: oldDateObj,
          endDate: newDateObj,
        },
        {
          userId: 3,
          spotId: 2,
          startDate: oldDateObj,
          endDate: newDateObj,
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      "Bookings",
      {
        name: { [Op.in]: ["Bnb on Main", "Bnb on White", "Bnb on Black"] },
      },
      {}
    );
  },
};
