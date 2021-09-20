import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";

import { getUserBookings } from "../../store/bookings";
import { getImages } from "../../store/images";
import { getSpots } from "../../store/spots";
import CancelBookingConfirmationModal from "../CancelBookingConfirmationModal/index";
import EditBookingModal from "../EditBookingModal/index";
import SorryComponent from "../Sorry/SorryComponent";

import styles from "../../components/TestSearch/SearchContainer.module.css";
import styles2 from "../../components/TestBookings/BookingContainer.module.css";
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

  useEffect(() => {
    dispatch(getSpots());
    dispatch(getImages());
    dispatch(getUserBookings(session.user.id));
  }, [dispatch]);

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
  };

  let giveMeName = (id) => {
    if (spots[id]) {
      return spots[id].name;
    } else return null;
  };

  return (
    <>
      <div className={styles.componentContainer}>
        {futureBookings.length === 0 && pastBookings.length === 0 && (
          <SorryComponent noBookings={true} />
        )}

        {futureBookings.length === 1 && (
          <h3 className={styles.subHeader}>
            {futureBookings.length} Reservation
          </h3>
        )}

        {futureBookings.length > 1 && (
          <h3 className={styles.subHeader}>
            {futureBookings.length} Reservations
          </h3>
        )}

        {futureBookings.length !== 0 && <div className={styles.divisor2} />}

        {futureBookings.map((booking) => (
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
                  src={booking.imgUrl}
                />
              </div>

              <div className={styles.results}>
                <div className={styles.detailContainer}></div>

                <div
                  onClick={() => linkMe(booking)}
                  className={styles2.spotName}
                >
                  {booking.Spot.name}
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
        {pastBookings.length === 0 && <SorryComponent noBookings={true} />}
        {pastBookings.length === 1 && (
          <h3 className={styles.subHeader}>Past Reservations</h3>
        )}

        {pastBookings.length > 1 && (
          <h3 className={styles.subHeader}>Past Reservations</h3>
        )}

        <div className={styles.divisor2} />

        {pastBookings.map((booking) => (
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
                  src={booking.imgUrl}
                />
              </div>

              <div className={styles.results}>
                <div className={styles.detailContainer}></div>

                <div
                  onClick={() => linkMe(booking)}
                  className={styles2.spotName}
                >
                  {booking.Spot.name}
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
