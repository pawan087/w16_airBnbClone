"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Spots",
      [
        {
          userId: "2",
          address: "123 Main Street",
          city: "San Jose",
          country: "United States of America",
          lat: null,
          lng: null,
          name: "Bnb on Main",
          price: 100.0,
        },
        {
          userId: "2",
          address: "456 White Road",
          city: "San Francisco",
          country: "United States of America",
          lat: null,
          lng: null,
          name: "Bnb on White",
          price: 200.0,
        },
        {
          userId: "3",
          address: "789 Black Avenue",
          city: "San Diego",
          country: "United States of America",
          lat: null,
          lng: null,
          name: "Bnb on Black",
          price: 300.0,
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      "Spots",
      {
        name: { [Op.in]: ["Bnb on Main", "Bnb on White", "Bnb on Black"] },
      },
      {}
    );
  },
};
