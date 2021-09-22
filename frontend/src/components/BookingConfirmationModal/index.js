import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

import { MyModal } from "../../context/BookingConfirmation";
import { MyFourthModal } from "../../context/Sorry";
import ConfirmationForm from "./ConfirmationForm";
import Sorry from "./Sorry";

import styles from "../../components/TestSpot/ReserveFormContainer.module.css";

function BookingConfirmationModal({ total, spot, endDate, startDate }) {
  const history = useHistory();
  const { spotId } = useParams();

  const bookings = useSelector((state) => state.booking);
  const user = useSelector((state) => state.session.user);

  let bool = false;
  let bool2 = true;
  const [showModal, setShowModal] = useState(false);
  const [showSecondModal] = useState(false);
  const bookingsArr = Object.values(bookings);

  const specificBookings = bookingsArr.filter((b) => {
    return b["spotId"] === +spotId;
  });

  if (user === undefined || user === null) {
    bool = false;
    bool2 = false;
  } else {
    if (specificBookings.length === 0) {
      bool = true;
    } else {
      specificBookings.forEach((booking) => {
        if (startDate < endDate) {
          if (booking.startDate < startDate && endDate < booking.endDate) {
            console.log('yee11')
            bool = false;
            return;
          }

          if (
            startDate < booking.startDate &&
            booking.startDate < endDate &&
            endDate < booking.endDate
          ) {
            bool = false;
            console.log('yee2')
            return;
          }

          if (startDate < booking.startDate && booking.endDate < endDate) {
            bool = false;
            console.log('yee3')
            return;
          }

          if (
            booking.startDate < startDate &&
            booking.endDate < endDate &&
            startDate < booking.endDate
          ) {
            bool = false;
            console.log('yee4')
            return;
          }

          bool = true;
        }
      });
    }
  }
  const redirectMe = (e) => {
    e.preventDefault();
    history.push("/login");
  };

  return (
    <>
      {bool === true && (
        <button className={styles.btn} onClick={() => setShowModal(true)}>
          Reserve
        </button>
      )}{" "}
      {bool === false && bool2 === true && (
        <button className={styles.btn2}>Reserve</button>
      )}
      {bool2 === false && (
        <button onClick={(e) => redirectMe(e)} className={styles.btn3}>
          Please Log-in
        </button>
      )}
      {showModal && true && true && (
        <MyModal onClose={() => setShowModal(false)}>
          <ConfirmationForm
            total={total}
            spot={spot}
            startDate={startDate}
            endDate={endDate}
          />
        </MyModal>
      )}
      {showSecondModal && (
        <MyFourthModal>
          <Sorry />
        </MyFourthModal>
      )}
    </>
  );
}

export default BookingConfirmationModal;
