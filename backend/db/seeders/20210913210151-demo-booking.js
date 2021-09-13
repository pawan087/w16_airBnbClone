"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    let oldDateObj = new Date();
    let newDateObj = new Date();
    let newDateObj2 = new Date();

    newDateObj.setTime(oldDateObj.getTime() + 10080 * 60 * 1000);
    newDateObj2.setTime(oldDateObj.getTime() + 20160 * 60 * 1000);

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
        {
          userId: 4,
          spotId: 3,
          startDate: newDateObj,
          endDate: newDateObj2,
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
        spotId: { [Op.in]: [3, 1, 2] },
      },
      {}
    );
  },
};
