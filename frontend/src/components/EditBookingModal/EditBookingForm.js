import React, { useState, useEffect } from "react";
import { DateRangePicker } from "react-date-range";
import { useDispatch, useSelector } from "react-redux";
import ReactLoading from "react-loading";

import { getUserBookings } from "../../store/bookings";
import { getImages } from "../../store/images";
import { getSpots } from "../../store/spots";
import { getBookings } from "../../store/bookings";
import { editBooking } from "../../store/bookings";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import styles from "../../components/EditBookingModal/EditBookingForm.module.css";

function EditBookingForm({ name, username, booking, setShowModal }) {
  const dispatch = useDispatch();

  const bookings = useSelector((state) => state.booking);
  const session = useSelector((state) => state.session);

  let initialStartDate = new Date(new Date(booking?.startDate).valueOf());

  let initialEndDate = new Date(new Date(booking?.endDate).valueOf());

  if (String(initialStartDate)[16] === "1") {
    initialStartDate = new Date(initialStartDate.valueOf() + 1000 * 3600 * 8);
  }

  if (String(initialEndDate)[16] === "1") {
    initialEndDate = new Date(initialEndDate.valueOf() + 1000 * 3600 * 8);
  }

  const [load, setLoad] = useState(false);
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);

  let userId = booking?.userId;
  let spotId = booking?.spotId;
  let bookingId = booking?.id;

  const bookingsArr = Object.values(bookings);

  let sd = new Date(startDate);
  let ed = new Date(endDate);
  let bool = false;

  const specificBookings = bookingsArr?.filter((b) => {
    return b["spotId"] === +spotId && b.id !== booking.id;
  });

  specificBookings?.forEach((booking) => {
    let x = new Date(booking.startDate);
    let y = new Date(booking.endDate);

    if (x.getTime() === ed.getTime()) {
      // bool = true;
      // console.log("yee1");
      return;
    }

    if (sd.getTime() === y.getTime()) {
      // bool = true;
      // console.log("yee2");
      return;
    }

    if (sd.getTime() < ed.getTime()) {
      if (x.getTime() <= sd.getTime() && ed.getTime() <= y.getTime()) {
        bool = true;
        // console.log("yee3");
        return;
      }
      if (
        sd.getTime() <= x.getTime() &&
        x.getTime() <= ed.getTime() &&
        ed.getTime() <= y.getTime()
      ) {
        bool = true;
        // console.log("yee4");
        return;
      }
      if (sd.getTime() <= x.getTime() && y.getTime() <= ed.getTime()) {
        bool = true;
        // console.log("yee5");
        return;
      }
      if (
        x.getTime() <= sd.getTime() &&
        y.getTime() <= ed.getTime() &&
        sd.getTime() <= y.getTime()
      ) {
        bool = true;
        // console.log("yee6");
        return;
      }
      return;
    }

    // bool = false;
  });

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  const [showWarning, setShowWarning] = useState(false);

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);

    setShowWarning(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoad(true);

    if (
      startDate.getTime() === initialStartDate.getTime() &&
      endDate.getTime() === initialEndDate.getTime()
    ) {
      setShowModal(false);
      setLoad(false);

      return;
    }

    if (startDate.getTime() === endDate.getTime()) {
      setShowModal(false);
      setLoad(false);

      return;
    }

    await dispatch(
      editBooking({ bookingId, userId, spotId, startDate, endDate })
    );

    await dispatch(getSpots());

    await dispatch(getImages());

    await dispatch(getUserBookings(session.user.id));

    setShowModal(false);
    setLoad(false);

    return;
  };

  useEffect(() => {
    dispatch(getBookings());
  }, [dispatch]);

  let today = new Date();
  let tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  // Remove console error with the following from stackoverflow
  const [didMount, setDidMount] = useState(false);
  useEffect(() => {
    setDidMount(true);
    return () => setDidMount(false);
  }, []);
  if (!didMount) return null;
  // End stackoverflow

  return (
    <div className={styles.outerContainer}>
      <div className={styles.logoContainer}>
        <img
          src={
            "https://logos-world.net/wp-content/uploads/2020/07/Airbnb-Logo-2008-2014.png"
          }
          alt="bnbLogo"
          className={styles.logo}
        ></img>
      </div>

      <div className={styles.cardContainer}>
        <div className={styles.topCardContainer}>
          <div className={styles.title}>{name}</div>

          {showWarning && bool && (
            <div className={styles.subtitle}>
              {"Sorry, those dates are unavailable at this time."}
            </div>
          )}
        </div>

        {load && (
          <div className={styles.loaderCotnainer}>
            <ReactLoading
              type={"cylon"}
              color={"#009cd5"}
              height={"0px"}
              width={"57.5px"}
            />
          </div>
        )}

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
              minDate={tomorrow}
              ranges={[selectionRange]}
            />
          </div>
        </div>

        <div className={styles.btnsContainer}>
          <button
            onClick={() => setShowModal(false)}
            className={styles.btnCancel}
          >
            Cancel
          </button>

          {!bool && startDate !== endDate && (
            <button
              onClick={(e) => handleSubmit(e)}
              className={styles.btnSubmit}
            >
              Submit
            </button>
          )}

          {(bool || startDate === endDate) && (
            <button className={styles.btnSubmit2}>Submit</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default EditBookingForm;
