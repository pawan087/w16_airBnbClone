import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect, Route } from "react-router-dom";
import { getBookings } from "../../store/bookings";
import { getImages } from "../../store/images";
import { getSpots } from "../../store/spots";
import styles from "../../components/TestSearch/SearchContainer.module.css";
export default function BookingsContainer() {
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

  return (
    <ul>
      {userBookings.map((booking) => (
        <li>{booking.Spot.name}</li>
      ))}
      {userBookings.map((booking) => (
        <li>{booking.startDate}</li>
      ))}
      {userBookings.map((booking) => (
        <div className={styles.resultsContainer}>
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
            </div>
          </div>
        </div>
      ))}
    </ul>
  );
}
