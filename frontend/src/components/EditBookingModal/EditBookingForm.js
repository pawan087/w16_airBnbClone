import React, { useState, useEffect } from "react";
import { DateRangePicker } from "react-date-range";
import { useDispatch, useSelector } from "react-redux";

import { getBookings } from "../../store/bookings";
import { editBooking } from "../../store/bookings";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import styles from "../../components/EditBookingModal/EditBookingForm.module.css";

function EditBookingForm({ name, username, booking }) {
  const dispatch = useDispatch();

  const bookings = useSelector((state) => state.booking);

  let initialStartDate = new Date(
    new Date(booking.startDate).valueOf() + 1000 * 3600 * 24
  );

  let initialEndDate = new Date(
    new Date(booking.endDate).valueOf() + 1000 * 3600 * 24
  );

  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);
  let userId = booking.userId;
  let spotId = booking.spotId;
  let bookingId = booking.id;
  const bookingsArr = Object.values(bookings);
  let sd = new Date(startDate);
  let ed = new Date(endDate);
  let bool = false;

  const specificBookings = bookingsArr.filter((b) => {
    return b["spotId"] === +spotId;
  });

  specificBookings.forEach((booking) => {
    let x = new Date(booking.startDate);
    let y = new Date(booking.endDate);

    if (x === ed) {
      bool = true;
      return;
    }
    if (sd === y) {
      bool = true;
      return;
    }
    if (sd < ed) {
      if (x < sd && ed < y) {
        bool = true;
        return;
      }
      if (sd < x && x < ed && ed < y) {
        bool = true;
        return;
      }
      if (sd < x && y < ed) {
        bool = true;
        return;
      }
      if (x < sd && y < ed && sd < y) {
        bool = true;
        return;
      }
      return;
    }
    bool = false;
  });

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  const refreshMe = (e) => {
    e.preventDefault();

    window.location.reload();
  };

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);

    setEndDate(ranges.selection.endDate);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(editBooking({ bookingId, userId, spotId, startDate, endDate }));

    window.location.reload();
  };
  useEffect(() => {
    dispatch(getBookings());
  }, [bool, dispatch]);

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
          <div className={styles.title}>{name}</div>

          {bool === true && (
            <div className={styles.subtitle}>
              {"Sorry, those dates are unavailable at this time."}
            </div>
          )}
        </div>

        <div className={styles.middleContainer}>
          <div className={styles.middleHeader}>{username}'s Itinerary</div>

          <div className={styles.divisor}></div>

          <div className={styles.label}></div>

          <div className={styles.detail}></div>

          <div className={styles.dateRangePickerContainer}>
            <DateRangePicker
              className={styles.dateRangePicker}
              onChange={handleSelect}
              rangeColors={["#009cd5"]}
              minDate={new Date()}
              ranges={[selectionRange]}
            />
          </div>
        </div>

        <div className={styles.btnsContainer}>
          <button onClick={(e) => refreshMe(e)} className={styles.btnCancel}>
            Cancel
          </button>

          {bool === false && (
            <button
              onClick={(e) => handleSubmit(e)}
              className={styles.btnSubmit}
            >
              Submit
            </button>
          )}

          {bool === true && (
            <button className={styles.btnSubmit2}>Submit</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default EditBookingForm;
