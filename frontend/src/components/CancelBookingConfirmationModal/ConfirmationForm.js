import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getBookings } from "../../store/bookings";
import { getSpots } from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../components/BookingConfirmationModal/ConfirmationForm.module.css";
import { Redirect } from "react-router-dom";
import * as bookingActions from "../../store/bookings";
function ConfirmationForm({ bookingId, startDate, endDate, name, username }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [userId, setUserId] = useState();
  const [spotId, setSpotId] = useState();
  const bookings = useSelector((state) => state.booking);
  const spots = useSelector((state) => state.spot);
  const spotsArr = Object.values(spots);
  const bookingArr = Object.values(bookings);

  useEffect(() => {
    dispatch(getBookings());
    dispatch(getSpots());
  }, [dispatch]);
  const cancelMe = () => {
    window.location.reload();
  };
  return (
    <div className={styles.outerContainer}>
      <div className={styles.logoContainer}>
        <img
          className={styles.logo}
          src={
            "https://logos-world.net/wp-content/uploads/2020/07/Airbnb-Logo-2008-2014.png"
          }
          className={styles.logo}
        ></img>
      </div>

      <div className={styles.cardContainer}>
        <div className={styles.topCardContainer}>
          <div className={styles.title}>Reservation Cancellation</div>
          <div className={styles.subtitle}>{name}</div>
        </div>
        <div className={styles.middleContainer}>
          <div className={styles.middleHeader}>{username}'s Itinerary</div>
          <div className={styles.divisor}></div>
          <div className={styles.label}>Date(s)</div>
          <div className={styles.detail}>
            {startDate.slice(5, 10)} through {endDate.slice(5, 10)}
          </div>
          <div className={styles.label}></div>
          <div className={styles.detail}></div>
          <div className={styles.middleFooter}>
            Cancellations are allowed 24 hours before check-in.
          </div>
        </div>
        <div className={styles.btnsContainer}>
          <button onClick={cancelMe} className={styles.btnCancel}>
            Go Back
          </button>
          <button className={styles.btnSubmit}>Cancel Reservation</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationForm;
