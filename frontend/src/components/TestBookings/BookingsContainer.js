import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect, Route } from "react-router-dom";
import { getBookings, getUserBookings } from "../../store/bookings";
import { getImages } from "../../store/images";
import { getSpots } from "../../store/spots";
import { useHistory } from "react-router-dom";
import styles from "../../components/TestSearch/SearchContainer.module.css";
import styles2 from "../../components/TestBookings/BookingContainer.module.css";
import CancelBookingConfirmationModal from "../CancelBookingConfirmationModal/index";
import EditBookingModal from "../EditBookingModal/index";
import { AnimatePresence, motion } from "framer-motion";
import SorryComponent from "../Sorry/SorryComponent";

export default function BookingsContainer() {
  const history = useHistory();
  const dispatch = useDispatch();
  const session = useSelector((state) => state.session);
  const bookings = useSelector((state) => state.booking);
  const spots = useSelector((state) => state.spot);
  const images = useSelector((state) => state.images);
  const imagesArr = Object.values(images);
  let userBookingsArr = Object.values(bookings);

  // console.log('yee',spots['4'].name)

  // console.log(bookings[5].Spot.name);

  useEffect(() => {
    dispatch(getSpots());
    dispatch(getImages());
    dispatch(getUserBookings(session.user.id));
    // console.log(session.user.id);
  }, [dispatch]);

  if (!session.user) return <Redirect to="/" />;

  const userId = session.user.id;
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
    <div className={styles.componentContainer}>
      {!userBookingsArr && <SorryComponent noBookings={true} />}
      {userBookingsArr.map((booking) => (
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

              <div onClick={() => linkMe(booking)} className={styles2.spotName}>
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
  );
}

// <div className={styles2.deleteContainer}>
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     className="h-6 w-6"
//     fill="none"
//     viewBox="0 0 24 24"
//     stroke="currentColor"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth={2}
//       d="M6 18L18 6M6 6l12 12"
//     />
//   </svg>
// </div>
