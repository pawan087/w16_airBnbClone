import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getSpots } from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../components/EditBookingModal/EditBookingForm.module.css";
import { delBooking } from "../../store/bookings";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
function EditBookingForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };
  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
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
        <div className={styles.title}>{"Bnb on Daybreak"}</div>
        <div className={styles.subtitle}>{"Errors:"}</div>
        </div>
        <div className={styles.middleContainer}>
          <div className={styles.middleHeader}>{"Pawan"}'s Itinerary</div>
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
          <button className={styles.btnCancel}>Cancel</button>
          <button className={styles.btnSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default EditBookingForm;
