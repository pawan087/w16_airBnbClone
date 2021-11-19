import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect } from "react-router-dom";
import MapComponent from "../Map/MapComponent";

import { getSearch2 } from "../../store/search";
import { getImages } from "../../store/images";
import { getReviews } from "../../store/reviews";
import { getSpots } from "../../store/spots";
import ReviewFormContainer from "./ReviewFormContainer";
import ReserveFormComponent from "./ReserveFormComponent";
import Sorry from "../BookingConfirmationModal/Sorry";
import AllReviewsComponent from "./AllReviewsComponent";

import styles from "../../components/TestSpot/SpotContainer.module.css";
// import { AnimatePresence, motion } from "framer-motion";

export default function SpotsContainer() {
  const { spotId } = useParams();
  const dispatch = useDispatch();

  const searchCriteria = useSelector((state) => state.search);
  const spots = useSelector((state) => state.spot);
  const images = useSelector((state) => state.images);
  const reviews = useSelector((state) => state.review);
  const search2 = useSelector((state) => state.search2);

  let searchedStartDate = searchCriteria.startDate;
  let searchedEndDate = searchCriteria.endDate;

  if (searchCriteria.startDate)
    searchedStartDate = searchedStartDate.toISOString().split("T")[0];
  if (searchCriteria.endDate)
    searchedEndDate = searchedEndDate.toISOString().split("T")[0];

  let startDate = searchedStartDate;
  // const [startDate, setStartDate] = useState(searchedStartDate);

  let endDate = searchedEndDate;
  // const [endDate, setEndDate] = useState(searchedEndDate);

  const spotsArr = Object.values(spots);
  const reviewsArr = Object.values(reviews);
  const imagesArr = Object.values(images);

  let lat;
  let lng;
  let showSpot = false;
  let image;
  let sd = search2.startDate;
  let ed = search2.endDate;

  const spot = spotsArr.filter((spot) => spot["id"] === +spotId);

  const specificImages = imagesArr.filter((image) => image.spotId === +spotId);

  const specificReviews = reviewsArr.filter(
    (review) => review["spotId"] === +spotId
  );

  if (spot[0]) {
    lng = +spot[0].lng;
    lat = +spot[0].lat;
  }

  if (spot[0]) {
    showSpot = true;
  }

  if (specificImages[0]) {
    image = specificImages[0].url;
  } else {
    image = "";
  }

  let bool = false;

  const bookings = useSelector((state) => state.booking);

  const bookingsArr = Object.values(bookings);

  const specificBookings = bookingsArr.filter((b) => {
    return b["spotId"] === +spotId;
  });

  if (specificBookings.length === 0) {
    bool = false;
  } else {
    specificBookings.forEach((booking) => {
      let y = booking.endDate.slice(0, 10);
      let x = booking.startDate.slice(0, 10);

      if (x === ed) {
        bool = true;
        return;
      }

      if (sd === y) {
        bool = true;
        return;
      }

      if (sd < ed) {
        if (booking.startDate < sd && ed < booking.endDate) {
          bool = true;
          return;
        }

        if (
          sd < booking.startDate &&
          booking.startDate < ed &&
          ed < booking.endDate
        ) {
          bool = true;
          return;
        }

        if (sd < booking.startDate && booking.endDate < ed) {
          bool = true;
          return;
        }

        if (
          booking.startDate < sd &&
          booking.endDate < ed &&
          sd < booking.endDate
        ) {
          bool = true;
          return;
        }

        bool = false;
      }
    });
  }

  useEffect(() => {
    dispatch(getSpots());

    dispatch(getReviews());

    dispatch(getImages());

    dispatch(getSearch2({ startDate: "", endDate: "" }));
  }, [startDate, endDate, dispatch, searchCriteria]);

  if (!spot) return <Redirect to="/" />;

  return (
    <div className={styles.outerContainer}>
      {showSpot && (
        <div className={styles.resultsContainer}>
          <div className={styles.cardContainer}>
            <div className={styles.imgContainer}>
              <img
                className={styles.img}
                layout="fill"
                objectfit="cover"
                src={image}
                alt="bookingImg"
              />
            </div>

            <div className={styles.results}>
              <div className={styles.detailContainer}></div>

              <span className={styles.spotName}>{spot[0].name}</span>

              <div className={styles.divisor} />

              <p className={styles.detail}>
                {spot[0].address}, {spot[0].city}, {spot[0].country}
              </p>

              <div className={styles.priceDetail}>
                <div>
                  <p className={styles.price}>${spot[0].price}/night</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.mapContainer}>
            <MapComponent
              id={spotId}
              lng={lng}
              lat={lat}
              className={styles.map}
            />
          </div>
        </div>
      )}

      {bool === true && <Sorry />}

      <ReserveFormComponent
        spot={spot}
        startDate={startDate}
        endDate={endDate}
      />

      <ReviewFormContainer spot={spot} />

      <AllReviewsComponent reviewsArr={specificReviews} />
    </div>
  );
}
