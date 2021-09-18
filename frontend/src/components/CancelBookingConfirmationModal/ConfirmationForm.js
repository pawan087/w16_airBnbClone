import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
// import { getBookings } from "../../store/bookings";
import { getSpots } from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../components/BookingConfirmationModal/ConfirmationForm.module.css";
import { Redirect } from "react-router-dom";
import { delBooking } from "../../store/bookings";

function ConfirmationForm({
  booking,
  bookingId,
  startDate,
  endDate,
  name,
  username,
}) {
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [userId, setUserId] = useState();
  // console.log(booking.id);
  const [spotId, setSpotId] = useState();
  // const bookings = useSelector((state) => state.booking);
  const spots = useSelector((state) => state.spot);
  const spotsArr = Object.values(spots);
  // const bookingArr = Object.values(bookings);
  // const specificBooking = bookingArr.filter((b) => b.id === bookingId);
  // console.log(specificBooking[0].id);

  const deleteBooking = (e, b) => {
    e.preventDefault();
    dispatch(delBooking(b));
    window.location.reload();
  };

  useEffect(() => {
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
            Cancellations, as always, are always free but require a 24 hour
            notice.
          </div>
        </div>
        <div className={styles.btnsContainer}>
          <button onClick={cancelMe} className={styles.btnCancel}>
            Go Back
          </button>
          <button
            onClick={(e) => deleteBooking(e, booking)}
            className={styles.btnSubmit}
          >
            Cancel Reservation
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationForm;
