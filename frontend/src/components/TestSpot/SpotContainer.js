import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect, Route } from "react-router-dom";
import { getImages } from "../../store/images";
import { getReviews } from "../../store/reviews";
import { getSpots } from "../../store/spots";
import ReviewFormContainer from "./ReviewFormContainer";
import styles from "../../components/TestSpot/SpotContainer.module.css";
import ReserveFormComponent from "./ReserveFormComponent";
import Sorry from "../BookingConfirmationModal/Sorry";
import { getSearch2 } from "../../store/search";
import AllReviewsComponent from "./AllReviewsComponent";
import MapComponent from "../Map/MapComponent";
import BookingConfirmationModal from "../BookingConfirmationModal/index";
import { AnimatePresence, motion } from "framer-motion";
import { getAlreadyBooked } from "../../store/bookings";
export default function SpotsContainer() {
  const { spotId } = useParams();
  const dispatch = useDispatch();

  const searchCriteria = useSelector((state) => state.search);
  let searchedStartDate = searchCriteria.startDate;
  let searchedEndDate = searchCriteria.endDate;
  if (searchCriteria.startDate)
    searchedStartDate = searchedStartDate.toISOString().split("T")[0];
  if (searchCriteria.endDate)
    searchedEndDate = searchedEndDate.toISOString().split("T")[0];
  const [startDate, setStartDate] = useState(searchedStartDate);
  const [endDate, setEndDate] = useState(searchedEndDate);
  const spots = useSelector((state) => state.spot);
  const images = useSelector((state) => state.images);
  const reviews = useSelector((state) => state.review);
  const spotsArr = Object.values(spots);
  const reviewsArr = Object.values(reviews);
  const spot = spotsArr.filter((spot) => spot["id"] === +spotId);
  let lat;
  let lng;
  if (spot[0]) {
    lng = +spot[0].lng;
    lat = +spot[0].lat;
  }
  const specificReviews = reviewsArr.filter(
    (review) => review["spotId"] === +spotId
  );
  const imagesArr = Object.values(images);
  const specificImages = imagesArr.filter((image) => image.spotId === +spotId);
  let showSpot = false;
  if (spot[0]) {
    showSpot = true;
  }
  let image;
  if (specificImages[0]) {
    image = specificImages[0].url;
  } else {
    image = "";
  }

  const search2 = useSelector((state) => state.search2);
  let sd = search2.startDate;
  let ed = search2.endDate;

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
          console.log("yee111");
          // dispatch(getAlreadyBooked(true));
          bool = true;
          return;
        }
        if (
          sd < booking.startDate &&
          booking.startDate < ed &&
          ed < booking.endDate
        ) {
          console.log("yee212");
          bool = true;
          // dispatch(getAlreadyBooked(true));
          return;
        }
        if (sd < booking.startDate && booking.endDate < ed) {
          console.log("yee313");
          bool = true;
          // dispatch(getAlreadyBooked(true));
          return;
        }
        if (
          booking.startDate < sd &&
          booking.endDate < ed &&
          startDate < booking.endDate
        ) {
          bool = true;
          console.log("yee414");
          // dispatch(getAlreadyBooked(true));
          return;
        }
        bool = false;
        // dispatch(getAlreadyBooked(false));
      }
    });
  }

  useEffect(() => {
    dispatch(getSpots());
    dispatch(getReviews());
    dispatch(getImages());
    dispatch(getAlreadyBooked(false));
    dispatch(getSearch2({ startDate: "", endDate: "" }));
  }, [startDate, endDate, dispatch, searchCriteria]);

  if (!spot) return <Redirect to="/" />;

  <ul>
    {specificReviews.map((review) => (
      <li>{review.review}</li>
    ))}
  </ul>;

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
// {bool === true && <Sorry />}
