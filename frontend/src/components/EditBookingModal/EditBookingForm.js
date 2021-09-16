import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getSpots } from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../components/EditBookingModal/EditBookingForm.module.css";
import { delBooking } from "../../store/bookings";

function EditBookingForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
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
          <div className={styles.subtitle}>{"YEE"}</div>
        </div>
        <div className={styles.middleContainer}>
          <div className={styles.middleHeader}>{"YEE"}'s Itinerary</div>
          <div className={styles.divisor}></div>
          <div className={styles.label}>Date(s)</div>
          <div className={styles.detail}>{"YEE"}</div>
          <div className={styles.label}></div>
          <div className={styles.detail}></div>
          <div className={styles.middleFooter}>
            Cancellations, as always, are always free but require a 24 hour
            notice.
          </div>
        </div>
        <div className={styles.btnsContainer}>
          <button className={styles.btnCancel}>
            Go Back
          </button>
          <button

            className={styles.btnSubmit}
          >
            Cancel Reservation
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditBookingForm;
