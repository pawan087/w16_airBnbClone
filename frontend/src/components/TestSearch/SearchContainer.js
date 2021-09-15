import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getBookings } from "../../store/bookings";
import { getSpots } from "../../store/spots";
import ResultsContainer from "./ResultsContainer";
import styles from "../../components/TestSearch/SearchContainer.module.css";
export default function SearchContainer() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const searchCriteria = useSelector((state) => state.search);
  const images = useSelector((state) => state.images);
  let searchedStartDate = searchCriteria.startDate;
  let searchedEndDate = searchCriteria.endDate;

  if (searchCriteria.startDate)
    searchedStartDate = searchedStartDate.toISOString().split("T")[0];
  if (searchCriteria.endDate)
    searchedEndDate = searchedEndDate.toISOString().split("T")[0];

  const [location, setLocation] = useState(searchCriteria.searchInput);
  const [startDate, setStartDate] = useState(searchedStartDate);
  const [endDate, setEndDate] = useState(searchedEndDate);
  const [errors, setErrors] = useState([]);
  const bookings = useSelector((state) => state.booking);
  const spots = useSelector((state) => state.spot);
  const spotsArr = Object.values(spots);
  const bookingArr = Object.values(bookings);
  let searchResultsObj = {};

  // console.log(spotsArr[0].Images[0].url); // imgUrl
  // console.log(spotsArr[0].city); // location

  const x = new Date(startDate);
  const y = new Date(endDate);
  const dayCount = (y - x) / 60 / 60 / 1000 / 24;

  spotsArr.forEach((spot) => {
    if (spot.city === location) {
      searchResultsObj[spot.id] = spot;
    }
  });

  // console.log(bookingArr[0].Spot.city) // location
  // console.log(bookingArr[0].Spot.startDate) // startDate
  // console.log(bookingArr[0].Spot.endDate) // endDate

  bookingArr.forEach((booking) => {
    if (booking["Spot"]["city"] === location && startDate && endDate) {
      if (booking.startDate < startDate && endDate < booking.endDate) {
        // searchResultsObj[booking["Spot"]["id"]] = null;
        delete searchResultsObj[booking["Spot"]["id"]];
      }
      if (
        startDate < booking.startDate &&
        booking.startDate < endDate &&
        endDate < booking.endDate
      ) {
        // searchResultsObj[booking["Spot"]["id"]] = null;
        delete searchResultsObj[booking["Spot"]["id"]];
      }
      if (startDate < booking.startDate && booking.endDate < endDate) {
        // searchResultsObj[booking["Spot"]["id"]] = null;
        delete searchResultsObj[booking["Spot"]["id"]];
      }
      if (booking.startDate < startDate && booking.endDate < endDate) {
        // searchResultsObj[booking["Spot"]["id"]] = null;
        delete searchResultsObj[booking["Spot"]["id"]];
      }
    }
  });

  console.log(searchResultsObj);

  const arr = Object.values(searchResultsObj);
  let today = new Date();

  // bookingArr.forEach((booking) => {
  //   if (booking["Spot"]["city"] === location && startDate && endDate) {
  //     if (!(booking.startDate < startDate && endDate < booking.endDate)) {
  //       if (
  //         !(
  //           startDate < booking.startDate &&
  //           booking.startDate < endDate &&
  //           endDate < booking.endDate
  //         )
  //       )
  //         if (!(startDate < booking.startDate && booking.endDate < endDate)) {
  //           if (!(booking.startDate < startDate && booking.endDate < endDate)) {
  //             arr.push(booking["Spot"]);
  //           }
  //         }
  //     }
  //   }
  // });

  useEffect(() => {
    dispatch(getBookings());
    dispatch(getSpots());
    // dispatch(getImages());
  }, [dispatch, searchCriteria]);

  // if (!sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(location);
    console.log(startDate);
    console.log(endDate);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Location
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </label>

        <label>
          Start Date
          <input
            type="date"
            min={today.toISOString().split("T")[0]}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </label>

        <label>
          End Date
          <input
            type="date"
            value={endDate}
            min={today.toISOString().split("T")[0]}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </label>

        <button type="submit">Search</button>
      </form>

      <main>
        <section>
          {!arr.length && startDate && endDate && (
            <p>
              Sorry, there are no spots available in {location} between{" "}
              {startDate} and {endDate}.
            </p>
          )}
          {arr.length > 0 && <p>{arr.length} Spot(s) Available</p>}

          {arr.length > 0 && (
            <h1 className={styles.resultsHeader}>Stays in {location}</h1>
          )}

          <div className={styles.divisor2} />

          {
            arr.map((spot) => (
              <div className={styles.resultsContainer}>
                <div className={styles.cardContainer}>
                  <div className={styles.imgContainer}>
                    <img
                      className={styles.img}
                      layout="fill"
                      objectFit="cover"
                      src={spot.Images[0].url}
                    />
                  </div>

                  <div className={styles.results}>
                    <div className={styles.detailContainer}>
                      <p>{spot.city}</p>

                      <div className={styles.heartIcon}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                      </div>
                    </div>

                    <h4 className={styles.spotName}>{spot.name}</h4>

                    <div className={styles.divisor} />

                    <p className={styles.detail}>
                      {spot.address} {spot.city} {spot.country}
                    </p>

                    <div className={styles.priceDetail}>
                      <div>
                        <p className={styles.price}>{spot.price}</p>

                        <p className={styles.total}>{spot.price * dayCount}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </section>
      </main>
    </>
  );
}
