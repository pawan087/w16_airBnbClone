"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    let date1 = new Date();
    let date2 = new Date();
    let date3 = new Date();
    let date4 = new Date();
    let date5 = new Date();
    let date6 = new Date();

    date2.setTime(date1.getTime() + 10080 * 60 * 1000);
    date3.setTime(date1.getTime() + 20160 * 60 * 1000);
    date4.setTime(date1.getTime() + 30240 * 60 * 1000);
    date5.setTime(date1.getTime() + 40320 * 60 * 1000);
    date6.setTime(date1.getTime() + 50400 * 60 * 1000);

    return queryInterface.bulkInsert(
      "Bookings",
      [
        {
          userId: 2,
          spotId: 3,
          startDate: date1,
          endDate: date2,
        },
        {
          userId: 3,
          spotId: 1,
          startDate: date2,
          endDate: date3,
        },
        {
          userId: 3,
          spotId: 2,
          startDate: date3,
          endDate: date4,
        },
        {
          userId: 4,
          spotId: 3,
          startDate: date4,
          endDate: date5,
        },
        {
          userId: 1,
          spotId: 1,
          startDate: date5,
          endDate: date6,
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
