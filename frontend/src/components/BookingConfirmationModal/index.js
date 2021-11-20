import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

import { MyModal } from "../../context/BookingConfirmation";
import ConfirmationForm from "./ConfirmationForm";

import styles from "../../components/Spot/ReserveFormContainer.module.css";

function BookingConfirmationModal({ total, spot, endDate, startDate, bool3 }) {
  const history = useHistory();
  const { spotId } = useParams();

  const bookings = useSelector((state) => state.booking);
  const user = useSelector((state) => state.session.user);

  let bool = false;
  let bool2 = true;

  const [showModal, setShowModal] = useState(false);

  const bookingsArr = Object.values(bookings);

  const specificBookings = bookingsArr?.filter((b) => {
    return b["spotId"] === +spotId;
  });

  if (user === undefined || user === null) {
    bool = false;

    bool2 = false;
  } else {
    if (specificBookings?.length === 0) {
      bool = true;
    } else {
      specificBookings?.forEach((booking) => {
        if (startDate < endDate) {
          if (booking.startDate < startDate && endDate < booking.endDate) {
            bool = false;
            return;
          }

          if (
            startDate < booking.startDate &&
            booking.startDate < endDate &&
            endDate < booking.endDate
          ) {
            bool = false;
            return;
          }

          if (startDate < booking.startDate && booking.endDate < endDate) {
            bool = false;
            return;
          }

          if (
            booking.startDate < startDate &&
            booking.endDate < endDate &&
            startDate < booking.endDate
          ) {
            bool = false;
            return;
          }

          bool = true;
        }
      });
    }

    // return bool;
  }
  const redirectMe = (e) => {
    e.preventDefault();

    history.push("/login");

    return bool;
  };

    // Remove console error with the following from stackoverflow
    const [didMount, setDidMount] = useState(false);
    useEffect(() => {
      setDidMount(true);
      return () => setDidMount(false);
    }, []);
    if (!didMount) return null;
    // End stackoverflow


  return (
    <>
      {startDate < endDate && startDate && endDate && !bool3 && (
        <button className={styles.btn} onClick={() => setShowModal(true)}>
          Reserve
        </button>
      )}{" "}
      {bool3 && <button className={styles.btn4}>Reserve</button>}
      {!bool3 &&
        (!startDate ||
          !endDate ||
          startDate > endDate ||
          startDate === endDate) && (
          <button className={styles.btn4}>Reserve</button>
        )}
      {bool2 === false && (
        <button onClick={(e) => redirectMe(e)} className={styles.btn3}>
          Please Log-in
        </button>
      )}
      {showModal && (
        <MyModal onClose={() => setShowModal(false)}>
          <ConfirmationForm
            total={total}
            spot={spot}
            startDate={startDate}
            endDate={endDate}
            setShowModal={setShowModal}
          />
        </MyModal>
      )}
    </>
  );
}

export default BookingConfirmationModal;
