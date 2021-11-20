import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";

import { getUserBookings } from "../../store/bookings";
import { getImages } from "../../store/images";
import { getSpots } from "../../store/spots";
import CancelBookingConfirmationModal from "../CancelBookingConfirmationModal/index";
import EditBookingModal from "../EditBookingModal/index";
import SorryComponent from "../Sorry/SorryComponent";
import ReactLoading from "react-loading";

import styles from "../Search/SearchContainer.module.css";
import styles2 from "./BookingContainer.module.css";
// import { AnimatePresence, motion } from "framer-motion";

export default function BookingsContainer() {
  const history = useHistory();
  const dispatch = useDispatch();

  const session = useSelector((state) => state.session);
  const bookings = useSelector((state) => state.userBookings);
  const spots = useSelector((state) => state.spot);
  const images = useSelector((state) => state.images);

  const imagesArr = Object.values(images);
  let userBookingsArr = Object.values(bookings);

  let pastBookings = [];
  let futureBookings = [];

  for (let booking of userBookingsArr) {
    let today = new Date();

    let x = new Date(booking.startDate);

    if (x < today) {
      pastBookings.push(booking);
    } else {
      futureBookings.push(booking);
    }
  }

  const [load, setLoad] = useState(false);

  useEffect(() => {
    (async () => {
      await dispatch(getSpots());

      await dispatch(getImages());

      await dispatch(getUserBookings(session.user.id));

      setLoad(true);
    })();
  }, [dispatch, session.user.id]);

  if (!load) {
    return (
      <div className={styles2.loaderCotnainer}>
        <ReactLoading
          type={"cylon"}
          color={"#009cd5"}
          height={"0px"}
          width={"57.5px"}
        />
      </div>
    );
  }

  if (!session.user) return <Redirect to="/" />;

  const username = session.user.username;

  for (let bookingObj of userBookingsArr) {
    for (let imageObj of imagesArr) {
      if (imageObj.spotId === bookingObj.spotId) {
        bookingObj["imgUrl"] = imageObj.url;
      }
    }
  }

  const dayCount = (startDate, endDate) => {
    const x = new Date(startDate);

    const y = new Date(endDate);

    return (y - x) / 60 / 60 / 1000 / 24;
  };

  const linkMe = (booking) => {
    const { spotId } = booking;

    history.push(`/spots/${spotId}`);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  console.log(bookings);

  let giveMeName = (id) => {
    if (spots[id]) {
      return spots[id].name;
    } else return null;
  };

  pastBookings.sort(function (a, b) {
    if (new Date(a.startDate) < new Date(b.startDate)) {
      return -1;
    }

    if (new Date(a.startDate) > new Date(b.startDate)) {
      return +1;
    }

    return 0;
  });

  futureBookings.sort(function (a, b) {
    if (new Date(a.startDate) < new Date(b.startDate)) {
      return -1;
    }

    if (new Date(a.startDate) > new Date(b.startDate)) {
      return +1;
    }

    return 0;
  });

  return (
    <>
      <div className={styles.componentContainer}>
        {futureBookings?.length === 0 && <SorryComponent noBookings={true} />}

        {futureBookings?.length === 1 && (
          <h3 className={styles.subHeader}>
            {futureBookings?.length} Reservation
          </h3>
        )}

        {futureBookings?.length > 1 && (
          <h3 className={styles.subHeader}>
            {futureBookings?.length} Reservations
          </h3>
        )}

        {futureBookings?.length !== 0 && <div className={styles.divisor2} />}

        {futureBookings?.map((booking) => (
          <div className={styles2.resultsContainer}>
            <div className={styles.cardContainer}>
              <div
                onClick={() => linkMe(booking)}
                className={styles2.imgContainer}
              >
                <img
                  className={styles.img}
                  layout="fill"
                  objectFit="cover"
                  alt="bookingImg"
                  src={booking.imgUrl}
                />
              </div>

              <div className={styles.results}>
                <div className={styles.detailContainer}></div>

                <div className={styles2.spotName}>
                  <span
                    className={styles2.spotName2}
                    onClick={() => linkMe(booking)}
                  >
                    {booking.Spot.name}
                  </span>
                </div>

                <div className={styles.divisor} />

                <EditBookingModal
                  name={giveMeName(booking.spotId)}
                  username={username}
                  booking={booking}
                />

                <p className={styles2.detail}>
                  {" "}
                  {dayCount(booking.startDate, booking.endDate)} night stay:{" "}
                  {booking.startDate.slice(0, 10)} through{" "}
                  {booking.endDate.slice(0, 10)}
                </p>

                <div className={styles.btnContainer}>
                  <CancelBookingConfirmationModal
                    booking={booking}
                    bookingId={booking.id}
                    endDate={booking.endDate}
                    startDate={booking.startDate}
                    name={giveMeName(booking.spotId)}
                    username={username}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.componentContainer}>
        {pastBookings?.length === 0 && futureBookings?.length === 0 && (
          <SorryComponent noBookings={true} />
        )}

        {pastBookings?.length === 1 && (
          <h3 className={styles.subHeader}>Past Reservations</h3>
        )}

        {pastBookings?.length > 1 && (
          <h3 className={styles.subHeader}>Past Reservations</h3>
        )}

        {pastBookings?.length > 0 && <div className={styles.divisor2} />}

        {pastBookings?.map((booking) => (
          <div className={styles2.resultsContainer}>
            <div className={styles.cardContainer}>
              <div
                onClick={() => linkMe(booking)}
                className={styles2.imgContainer}
              >
                <img
                  className={styles.img}
                  layout="fill"
                  alt="bookingImg2"
                  objectFit="cover"
                  src={booking.imgUrl}
                />
              </div>

              <div className={styles.results}>
                <div className={styles.detailContainer}></div>

                <div className={styles2.spotName}>
                  <span
                    className={styles2.spotName2}
                    onClick={() => linkMe(booking)}
                  >
                    {booking.Spot.name}
                  </span>
                </div>

                <div className={styles.divisor} />

                <p className={styles2.detail}>
                  {" "}
                  {dayCount(booking.startDate, booking.endDate)} night stay:{" "}
                  {booking.startDate.slice(0, 10)} through{" "}
                  {booking.endDate.slice(0, 10)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
