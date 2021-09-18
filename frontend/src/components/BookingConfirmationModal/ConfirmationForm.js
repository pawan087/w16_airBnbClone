import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getBookings } from "../../store/bookings";
import { getSpots } from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../components/BookingConfirmationModal/ConfirmationForm.module.css";
import { Redirect } from "react-router-dom";
import * as bookingActions from "../../store/bookings";
function ConfirmationForm({ total, spot, startDate, endDate }) {
  const history = useHistory();
  
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [userId, setUserId] = useState(sessionUser.id);
  const [spotId, setSpotId] = useState(spot[0].id);
  const bookings = useSelector((state) => state.booking);
  const spots = useSelector((state) => state.spot);
  const spotsArr = Object.values(spots);
  const bookingArr = Object.values(bookings);
  let location = spot[0].city;
  let searchResultsObj = {};
  spotsArr.forEach((spot) => {
    if (spot.city === location) {
      searchResultsObj[spot.id] = spot;
    }
  });
  bookingArr.forEach((booking) => {
    if (booking["Spot"]["city"] === location && startDate && endDate) {
      if (booking.startDate < startDate && endDate < booking.endDate) {
        // searchResultsObj[booking["Spot"]["id"]] = null;
        delete searchResultsObj[booking["Spot"]["id"]];
      }
      if (
        startDate < booking.startDate &&
        booking.startDate < endDate &&
        endDate < booking.endDate
      ) {
        // searchResultsObj[booking["Spot"]["id"]] = null;
        delete searchResultsObj[booking["Spot"]["id"]];
      }
      if (startDate < booking.startDate && booking.endDate < endDate) {
        // searchResultsObj[booking["Spot"]["id"]] = null;
        delete searchResultsObj[booking["Spot"]["id"]];
      }
      if (booking.startDate < startDate && booking.endDate < endDate) {
        // searchResultsObj[booking["Spot"]["id"]] = null;
        delete searchResultsObj[booking["Spot"]["id"]];
      }
    }
  });
  const arr = Object.values(searchResultsObj);
  useEffect(() => {
    dispatch(getBookings());
    dispatch(getSpots());
    // dispatch(getImages());
  }, [dispatch]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (arr.length) {
      dispatch(
        bookingActions.create({ userId, spotId, startDate, endDate })
      ).catch(async (res) => {
        const data = await res.json();
      });
    }
    // history.push("/bookings");
    setTimeout(() => {
      history.push("/bookings");
    }, 1000);
  };

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
          <button onClick={handleSubmit} className={styles.btnSubmit}>
            Confirm Reservation
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationForm;
