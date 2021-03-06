"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Spots",
      [
        {
          userId: "5",
          address: "15350 Penitencia Creek Rd",
          city: "San Jose",
          country: "United States of America",
          lat: 37.39615831006313,
          lng: -121.80177981582484,
          name: "Casa San Martin",
          price: 317,
        },
        {
          userId: "5",
          address: "1 Paseo de San Antonio",
          city: "San Jose",
          country: "United States of America",
          lat: 37.33263933439148,
          lng: -121.88985283116887,
          name: "Urban Oasis",
          price: 419,
        },
        {
          userId: "5",
          address: "377 Santana Row",
          city: "San Jose",
          country: "United States of America",
          lat: 37.320164211249825,
          lng: -121.94839794651162,
          name: "Executive Winchester Orchard House",
          price: 300.0,
        },
        {
          userId: "5",
          address: "255 S Almaden Blvd",
          city: "San Jose",
          country: "United States of America",
          lat: 37.330123201741664,
          lng: -121.89222556979907,
          name: "Luxury Carbon-Neutral Home",
          price: 388,
        },
        {
          userId: "5",
          address: "1300 Senter Rd",
          city: "San Jose",
          country: "United States of America",
          lat: 37.32205491613081,
          lng: -121.85980138514168,
          name: "Modern Silicon Valley Oasis",
          price: 646,
        },
        {
          userId: "5",
          address: "114 Powell St",
          city: "San Francisco",
          country: "United States of America",
          lat: 37.787194522247454,
          lng: -122.40738767798385,
          name: "Balinese Retreat and Lush Garden",
          price: 547,
        },
        {
          userId: "5",
          address: "624 Irving St",
          city: "San Francisco",
          country: "United States of America",
          lat: 37.76542820688305,
          lng: -122.46494059277836,
          name: "Twin Peaks Oasis",
          price: 250,
        },
        {
          userId: "5",
          address: "1015 Battery St",
          city: "San Francisco",
          country: "United States of America",
          lat: 37.80088496842575,
          lng: -122.40183265560891,
          name: "Period Charms in Noe Valley",
          price: 595,
        },
        {
          userId: "5",
          address: "3601 Lyon St",
          city: "San Francisco",
          country: "United States of America",
          lat: 37.803125752963346,
          lng: -122.44840164464993,
          name: "The Elegant Edwardian",
          price: 371,
        },
        {
          userId: "5",
          address: "145 Jefferson St",
          city: "San Francisco",
          country: "United States of America",
          lat: 37.80843593894354,
          lng: -122.41474508697861,
          name: "The Farmhouse at Sunset",
          price: 698,
        },
        {
          userId: "5",
          address: "125 I St, Sacramento",
          city: "Sacramento",
          country: "United States of America",
          lat: 38.585095624170535,
          lng: -121.50431053113661,
          name: "Heart of Sacramento",
          price: 285,
        },
        {
          userId: "5",
          address: "3901 Land Park Dr",
          city: "Sacramento",
          country: "United States of America",
          lat: 38.540214774553206,
          lng: -121.50173254463095,
          name: "Fairytale Palace",
          price: 425,
        },
        {
          userId: "5",
          address: "6000 J St",
          city: "Sacramento",
          country: "United States of America",
          lat: 38.55856824506866,
          lng: -121.42183233113714,
          name: "Superb Executive Bungalow",
          price: 972,
        },
        {
          userId: "5",
          address: "1019 11th St",
          city: "Sacramento",
          country: "United States of America",
          lat: 38.57925442437894,
          lng: -121.4923632023011,
          name: "Mid-Century SacTown",
          price: 334,
        },
        {
          userId: "5",
          address: "915 L St",
          city: "Sacramento",
          country: "United States of America",
          lat: 38.578633766833775,
          lng: -121.49504541120518,
          name: "Curtis Park Place",
          price: 235,
        },
        {
          userId: "5",
          address: "100 Universal City Plaza",
          city: "Los Angeles",
          country: "United States of America",
          lat: 34.138223341958614,
          lng: -118.35328174289018,
          name: "The House of Whimsy",
          price: 425,
        },
        {
          userId: "5",
          address: "2800 E Observatory Rd",
          city: "Los Angeles",
          country: "United States of America",
          lat: 34.1197308894617,
          lng: -118.30039350036179,
          name: "The Wolford House",
          price: 305,
        },
        {
          userId: "5",
          address: "910 S Euclid St",
          city: "Los Angeles",
          country: "United States of America",
          lat: 33.82040094052828,
          lng: -117.94060579171945,
          name: "Mountaintop Estate",
          price: 580,
        },
        {
          userId: "5",
          address: "1200 Getty Center Dr",
          city: "Los Angeles",
          country: "United States of America",
          lat: 34.07818684975492,
          lng: -118.47394519871354,
          name: "Casa Laurel Canyon",
          price: 753,
        },
        {
          userId: "5",
          address: "6060 Wilshire Blvd",
          city: "Los Angeles",
          country: "United States of America",
          lat: 34.06216619022028,
          lng: -118.36124508522066,
          name: "Silverlake Guesthouse",
          price: 223,
        },
        {
          userId: "5",
          address: "1405 Park Blvd",
          city: "San Diego",
          country: "United States of America",
          lat: 32.72030985078171,
          lng: -117.15333299089502,
          name: "La Jolla Scenic Retreat",
          price: 566,
        },
        {
          userId: "5",
          address: "2920 Zoo Dr",
          city: "San Diego",
          country: "United States of America",
          lat: 32.73548745310166,
          lng: -117.1490674601138,
          name: "Seaside One",
          price: 388,
        },
        {
          userId: "5",
          address: "200 W Island Ave",
          city: "San Diego",
          country: "United States of America",
          lat: 32.71101535185127,
          lng: -117.1646911804137,
          name: "Casa Paradiso",
          price: 836,
        },
        {
          userId: "5",
          address: "5500 Campanile Dr",
          city: "San Diego",
          country: "United States of America",
          lat: 32.77613581636794,
          lng: -117.07122153429108,
          name: "Architectural Villa",
          price: 1279,
        },
        {
          userId: "5",
          address: "10818 San Diego Mission Rd",
          city: "San Diego",
          country: "United States of America",
          lat: 32.7848242978196,
          lng: -117.106011731277,
          name: "Hillcrest Hills Home",
          price: 279,
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
        name: {
          [Op.in]: [
            "Casa San Martin",
            "Urban Oasis",
            "Executive Winchester Orchard House",
            "Luxury Carbon-Neutral Home",
            "Modern Silicon Valley Oasis",
            "Balinese Retreat and Lush Garden",
            "Twin Peaks Oasis",
            "Period Charms in Noe Valley",
            "The Elegant Edwardian",
            "The Farmhouse at Sunset",
            "Heart of Sacramento",
            "Fairytale Palace",
            "Arden Acres",
            "Superb Executive Bungalow",
            "Mid-Century SacTown",
            "Curtis Park Place",
            "The House of Whimsy",
            "The Wolford House",
            "Mountaintop Estate",
            "Casa Laurel Canyon",
            "Silverlake Guesthouse",
            "La Jolla Scenic Retreat",
            "Seaside One",
            "Casa Paradiso",
            "Architectural Villa",
            "Hillcrest Hills Home",
          ],
        },
      },
      {}
    );
  },
};
