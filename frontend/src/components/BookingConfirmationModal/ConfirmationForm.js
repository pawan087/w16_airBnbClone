import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../components/BookingConfirmationModal/ConfirmationForm.module.css";
function ConfirmationForm({ total, spot, startDate, endDate }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
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
          {spot[0] && <div className={styles.subtitle}>{spot[0].name}</div>}
        </div>
        <div className={styles.middleContainer}>
          <div className={styles.middleHeader}>
            {sessionUser.username}'s Itinerary
          </div>
          <div className={styles.divisor}></div>
          <div className={styles.label}>Date(s)</div>
          {startDate && endDate && (
            <div className={styles.detail}>{`${startDate.slice(
              5
            )} through ${endDate.slice(5)}`}</div>
          )}
          <div className={styles.label}>Owner:</div>
          {spot[0] && <div className={styles.detail}>{spot[0].userId}</div>}
          <div className={styles.label}>Total:</div>
          <div className={styles.detail}>
            $
            {total -
              total * 0.025 +
              total * 0.15 +
              total * 0.1 +
              total * 0.0625}
          </div>
          <div className={styles.middleFooter}>
            The owner will receive payment two days after your stay ends.
          </div>
        </div>
        <div className={styles.btnsContainer}>
          <button onClick={cancelMe} className={styles.btnCancel}>
            Cancel
          </button>
          <button className={styles.btnSubmit}>Confirm Reservation</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationForm;
