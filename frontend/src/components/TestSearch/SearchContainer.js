import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import getCenter from "geolib/es/getCenter";

import MapComponent from "../Map/MapComponent";
import SorryComponent from "../Sorry/SorryComponent";

import styles from "../../components/TestSearch/SearchContainer.module.css";

export default function SearchContainer() {
  const history = useHistory();
  const dispatch = useDispatch();

  const searchCriteria = useSelector((state) => state.search);
  const searchResults = useSelector((state) => state.searchResults);

  let location = searchCriteria.searchInput;
  // const [location, setLocation] = useState(searchCriteria.searchInput);

  let startDate = searchCriteria.startDate;
  // const [startDate, setStartDate] = useState(searchCriteria.startDate);

  let endDate = searchCriteria.endDate;
  // const [endDate, setEndDate] = useState(searchCriteria.endDate);

  const searchResultsArr = Object.values(searchResults);

  const x = new Date(startDate);
  const y = new Date(endDate);
  const dayCount = (y - x) / 60 / 60 / 1000 / 24;

  let center;

  const linkMe = (spot) => {
    const { id } = spot;

    history.push(`/spots/${id}`);
  };

  if (searchResultsArr[0]) {
    const coordinates = searchResultsArr.map((x) => ({
      longitude: +x.lng,
      latitude: +x.lat,
    }));

    center = getCenter(coordinates);
  }

  useEffect(() => {}, [dispatch, searchCriteria]);

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
                      alt="spotImg"
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

                        {startDate !== endDate && (
                          <p className={styles.total}>
                            total ${spot.price * dayCount}
                          </p>
                        )}
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
