import { useSelector } from "react-redux";
import { useParams } from "react-router";

import styles from "./Sorry.module.css";

export default function Sorry() {
  const { spotId } = useParams();

  const bookings = useSelector((state) => state.booking);
  let bookingsArr = Object.values(bookings);

  let specificBookings = bookingsArr?.filter((b) => {
    return b.Spot.id === +spotId;
  });

  const datesArr = [];

  for (let booking of specificBookings) {
    datesArr.push([booking.startDate, booking.endDate]);
  }

  return (
    <div className={styles.outerContainer}>
      <div className={styles.logoContainer}></div>

      <div className={styles.cardContainer}>
        <div className={styles.topCardContainer}>
          <div className={styles.title}>
            Sorry, this Bnb is unavailable during that time
          </div>

          <div className={styles.subtitle}>
            {
              "Please consider another time period, apart from what's listed below:"
            }
          </div>
        </div>

        <div className={styles.middleContainer}>
          <div className={styles.divisor}></div>
          {datesArr.map((dateArr, i) => (
            <>
              <div className={styles.label}>Reservation {i + 1}:</div>

              <div className={styles.detail}>{`From ${dateArr[0].slice(
                5,
                10
              )} through ${dateArr[1].slice(5, 10)}`}</div>
            </>
          ))}
        </div>

        <div className={styles.btnsContainer}></div>
      </div>
    </div>
  );
}
