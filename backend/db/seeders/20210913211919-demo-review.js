"use strict";

const faker = require("faker");

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

let reviewsArr = [];

for (let i = 1; i <= 25; i++) {
  const rndInt = randomIntFromInterval(3, 6);

  for (let j = 1; j <= rndInt; j++) {
    let review = {};

    const rndUserId = randomIntFromInterval(1, 5);
    let randomParagraph = faker.lorem.sentence();

    review["userId"] = rndUserId;
    review["spotId"] = i;
    review["review"] = randomParagraph;

    reviewsArr.push(review);
  }
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Reviews", reviewsArr, {});
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
