import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getBookings } from "../../store/bookings";
import { getSpots } from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../components/BookingConfirmationModal/ConfirmationForm.module.css";
import { Redirect } from "react-router-dom";
import * as bookingActions from "../../store/bookings";
function ConfirmationForm() {
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
          <div className={styles.title}>Reservation Confirmation</div>
      <div className={styles.subtitle}>{'TEST'}</div>
        </div>
        <div className={styles.middleContainer}>
          <div className={styles.middleHeader}>
            {'TEST'}'s Itinerary
          </div>
          <div className={styles.divisor}></div>
          <div className={styles.label}>Date(s)</div>

            <div className={styles.detail}>{'YEE'}</div>
          )
          <div className={styles.label}>Owner:</div>
         <div className={styles.detail}>{'TEST'}</div>
          <div className={styles.label}>Total:</div>
          <div className={styles.detail}>{'TEST'}
          </div>
          <div className={styles.middleFooter}>
            The owner will receive payment two days after your stay ends.
          </div>
        </div>
        <div className={styles.btnsContainer}>
          <button onClick={cancelMe} className={styles.btnCancel}>
            Cancel
          </button>
          <button className={styles.btnSubmit}>
            Confirm Reservation
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationForm;
