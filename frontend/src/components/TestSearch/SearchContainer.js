import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getBookings } from "../../store/bookings";
import getCenter from "geolib/es/getCenter";
import { getSpots } from "../../store/spots";
import { useHistory } from "react-router-dom";
import MapComponent from "../Map/MapComponent";
import styles from "../../components/TestSearch/SearchContainer.module.css";
import SorryComponent from "../Sorry/SorryComponent";

export default function SearchContainer() {
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const searchCriteria = useSelector((state) => state.search);
  const searchResults = useSelector((state) => state.searchResults);
  const searchResultsArr = Object.values(searchResults);
  const [location, setLocation] = useState(searchCriteria.searchInput);
  const [startDate, setStartDate] = useState(searchCriteria.startDate);
  const [endDate, setEndDate] = useState(searchCriteria.endDate);
  const [errors, setErrors] = useState([]);

  const x = new Date(startDate);
  const y = new Date(endDate);
  const dayCount = (y - x) / 60 / 60 / 1000 / 24;
  console.log(searchCriteria);

  const linkMe = (spot) => {
    const { id } = spot;
    history.push(`/spots`);
  };
  let center;
  if (searchResultsArr[0]) {
    const coordinates = searchResultsArr.map((x) => ({
      longitude: +x.lng,
      latitude: +x.lat,
    }));
    center = getCenter(coordinates);
  }

  // if (window.location.pathname === "/search" && arr.length < 1) {
  //   history.push(`/sorry`);
  // }



  useEffect(() => {}, [dispatch, searchCriteria]);

  // if (!sessionUser) return <Redirect to="/" />;

  return (
    <div className={styles.componentContainer}>
      {searchResultsArr.length === 0 && <SorryComponent />}
      {searchResultsArr && (
        <main className={styles.outerContainer}>
          <section>
            {searchResultsArr.length === 1 && (
              <h3 className={styles.subHeader}>
                {searchResultsArr.length} Bnb Available
              </h3>
            )}

            {searchResultsArr.length > 1 && (
              <h3 className={styles.subHeader}>
                {searchResultsArr.length} Bnbs Available
              </h3>
            )}

            {searchResultsArr.length > 0 && (
              <h1 className={styles.resultsHeader}>Stays in {location}</h1>
            )}

            <div className={styles.divisor2} />

            {searchResultsArr.map((spot) => (
              <div
                onClick={() => linkMe(spot)}
                className={styles.resultsContainer}
              >
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
                    <div className={styles.detailContainer}></div>

                    <span className={styles.spotName}>{spot.name}</span>

                    <div className={styles.divisor} />

                    <p className={styles.detail}>
                      {spot.address}, {spot.city}, {spot.country}
                    </p>

                    <div className={styles.priceDetail}>
                      <div>
                        <p className={styles.price}>${spot.price}/night</p>

                        <p className={styles.total}>
                          total ${spot.price * dayCount}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </section>
          <section className={styles.map}>
            {searchResultsArr.length > 0 && (
              <MapComponent lat={center.latitude} lng={center.longitude} />
            )}
          </section>
        </main>
      )}
    </div>
  );
}

// <form onSubmit={handleSubmit}>
// <label>
//   Location
//   <input
//     type="text"
//     value={location}
//     onChange={(e) => setLocation(e.target.value)}
//     required
//   />
// </label>

// <label>
//   Start Date
//   <input
//     type="date"
//     min={today.toISOString().split("T")[0]}
//     value={startDate}
//     onChange={(e) => setStartDate(e.target.value)}
//     required
//   />
// </label>

// <label>
//   End Date
//   <input
//     type="date"
//     value={endDate}
//     min={today.toISOString().split("T")[0]}
//     onChange={(e) => setEndDate(e.target.value)}
//     required
//   />
// </label>

// <button type="submit">Search</button>
// </form>
