import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import getCenter from "geolib/es/getCenter";
import ReactLoading from "react-loading";

import { getUserBookings } from "../../store/bookings";
import { getImages } from "../../store/images";
import { getSpots } from "../../store/spots";
import MapComponent from "../Map/MapComponent";
import SorryComponent from "../Sorry/SorryComponent";

import styles from "./SearchContainer.module.css";

export default function SearchContainer() {
  const history = useHistory();
  const dispatch = useDispatch();

  const session = useSelector((state) => state.session);
  const searchCriteria = useSelector((state) => state.search);
  const searchResults = useSelector((state) => state.searchResults);
  const usersBookings = useSelector((state) => state.userBookings);
  const bookings = Object.values(usersBookings);
  const searchResultsArr = Object.values(searchResults);

  const unavailableBookings = [];

  bookings?.forEach((booking) => {
    let x = new Date(booking.startDate);
    let y = new Date(booking.endDate);

    let sd = new Date(searchCriteria.startDate);
    let ed = new Date(searchCriteria.endDate);

    if (x.getTime() <= sd.getTime() && ed.getTime() <= y.getTime()) {
      unavailableBookings.push(booking.spotId);
      return;
    }

    if (
      sd.getTime() <= x.getTime() &&
      x.getTime() <= ed.getTime() &&
      ed.getTime() <= y.getTime()
    ) {
      unavailableBookings.push(booking.spotId);
      return;
    }
    if (sd.getTime() <= x.getTime() && y.getTime() <= ed.getTime()) {
      unavailableBookings.push(booking.spotId);
      return;
    }
    if (
      x.getTime() <= sd.getTime() &&
      y.getTime() <= ed.getTime() &&
      sd.getTime() <= y.getTime()
    ) {
      unavailableBookings.push(booking.spotId);

      return;
    }

    return;
  });

  const filteredSearchResults = searchResultsArr.filter((searchResult) => {
    return !unavailableBookings.includes(searchResult.id);
  });

  let location = searchCriteria.searchInput;
  let startDate = searchCriteria.startDate;
  let endDate = searchCriteria.endDate;

  const x = new Date(startDate);
  const y = new Date(endDate);
  const dayCount = (y - x) / 60 / 60 / 1000 / 24;

  let center;

  const linkMe = (spot) => {
    const { id } = spot;

    history.push(`/spots/${id}`);

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const coordinates = filteredSearchResults?.map((x) => ({
    longitude: +x.lng,
    latitude: +x.lat,
  }));

  center = getCenter(coordinates);

  const [load, setLoad] = useState(false);

  useEffect(() => {
    (async () => {
      await dispatch(getSpots());

      await dispatch(getImages());

      await dispatch(getUserBookings(session?.user?.id));

      setLoad(true);
    })();
  }, [dispatch, searchCriteria, session?.user?.id]);

  if (!load) {
    return (
      <div className={styles.loaderCotnainer}>
        <ReactLoading
          type={"cylon"}
          color={"#009cd5"}
          height={"0px"}
          width={"57.5px"}
        />
      </div>
    );
  }

  return (
    <div className={styles.componentContainer}>
      {filteredSearchResults.length === 0 && <SorryComponent />}

      {filteredSearchResults && (
        <main className={styles.outerContainer}>
          <section>
            {filteredSearchResults.length === 1 && (
              <h3 className={styles.subHeader}>
                {filteredSearchResults.length} Bnb Available
              </h3>
            )}

            {filteredSearchResults.length > 1 && (
              <h3 className={styles.subHeader}>
                {filteredSearchResults.length} Bnbs Available
              </h3>
            )}

            {filteredSearchResults.length > 0 && (
              <h1 className={styles.resultsHeader}>
                Stays in <span>{location.toUpperCase()}</span>
              </h1>
            )}

            <div className={styles.divisor2} />

            {filteredSearchResults.map((spot, i) => (
              <div
                key={i}
                onClick={() => linkMe(spot)}
                className={styles.resultsContainer}
              >
                <div className={styles.cardContainer}>
                  <div className={styles.imgContainer}>
                    <img
                      className={styles.img}
                      layout="fill"
                      alt="spotImg"
                      src={spot.Images[0].url}
                    />
                  </div>

                  <div className={styles.results}>
                    <div className={styles.detailContainer}></div>

                    <span className={styles.spotName}>{spot?.name}</span>

                    <div className={styles.divisor} />

                    <p className={styles.detail}>
                      {spot?.address}, {spot?.city}, {spot?.country}
                    </p>

                    <div className={styles.priceDetail}>
                      <div>
                        <p className={styles.price}>${spot?.price}/night</p>

                        {startDate !== endDate && (
                          <p className={styles.total}>
                            total ${spot?.price * dayCount}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </section>

          <section className={styles.mapContainer}>
            {filteredSearchResults.length > 0 && (
              <MapComponent lat={center.latitude} lng={center.longitude} />
            )}
          </section>
        </main>
      )}
    </div>
  );
}
