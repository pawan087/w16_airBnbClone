import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect, Route } from "react-router-dom";
import { getBookings } from "../../store/bookings";
import { getImages } from "../../store/images";
import { getSpots } from "../../store/spots";
import { useHistory } from "react-router-dom";
import styles from "../../components/TestSearch/SearchContainer.module.css";
import styles2 from "../../components/TestBookings/BookingContainer.module.css";
export default function BookingsContainer() {
  const history = useHistory();
  const dispatch = useDispatch();
  const session = useSelector((state) => state.session);
  const bookings = useSelector((state) => state.booking);
  const spots = useSelector((state) => state.spot);
  const images = useSelector((state) => state.images);
  const spotsArr = Object.values(spots);
  const bookingArr = Object.values(bookings);
  const imagesArr = Object.values(images);

  // console.log(bookings[5].Spot.name);

  useEffect(() => {
    dispatch(getBookings());
    dispatch(getSpots());
    dispatch(getImages());
  }, [dispatch]);

  if (!session.user) return <Redirect to="/" />;

  const userId = session.user.id;

  const userBookings = bookingArr.filter(
    (booking) => booking.userId === userId
  );

  console.log(userBookings);

  for (let bookingObj of userBookings) {
    for (let imageObj of imagesArr) {
      console.log(imageObj.spotId);
      console.log(bookingObj.spotId);
      if (imageObj.spotId === bookingObj.spotId) {
        bookingObj["imgUrl"] = imageObj.url;
        console.log(bookingObj);
        console.log("yee");
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

  return (
    <>
      {userBookings.map((booking) => (
        <div
          onClick={() => linkMe(booking)}
          className={styles2.resultsContainer}
        >
          <div className={styles.cardContainer}>
            <div className={styles.imgContainer}>
              <img
                className={styles.img}
                layout="fill"
                objectFit="cover"
                src={booking.imgUrl}
              />
            </div>

            <div className={styles.results}>
              <div className={styles.detailContainer}></div>

              <span className={styles.spotName}>{booking.Spot.name}</span>

              <div className={styles.divisor} />

              <p className={styles.detail}>
                {" "}
                {dayCount(booking.startDate, booking.endDate)} night stay:{" "}
                {booking.startDate.slice(0, 10)} through{" "}
                {booking.endDate.slice(0, 10)}
              </p>
              <div className={styles2.deleteContainer}>
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
