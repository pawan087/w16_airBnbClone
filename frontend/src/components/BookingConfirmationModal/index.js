import React, { useEffect, useState } from "react";
import { MyModal } from "../../context/BookingConfirmation";
import { MyFourthModal } from "../../context/Sorry";
import ConfirmationForm from "./ConfirmationForm";
import styles from "../../components/TestSpot/ReserveFormContainer.module.css";

import Sorry from "./Sorry";
import { useSelector } from "react-redux";
import { getAlreadyBooked, getBookings } from "../../store/bookings";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";

function BookingConfirmationModal({ total, spot, endDate, startDate }) {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  let bool = false;

  const [showModal, setShowModal] = useState(false);
  const [showSecondModal, setSecondModal] = useState(false);
  const bookings = useSelector((state) => state.booking);


  const bookingsArr = Object.values(bookings);

  const specificBookings = bookingsArr.filter((b) => {
    return b["spotId"] === +spotId;
  });

  specificBookings.forEach((booking) => {
    if (startDate < endDate) {
      if (booking.startDate < startDate && endDate < booking.endDate) {
        // dispatch(getAlreadyBooked(true));
        console.log("yee11");
        bool = false;
        return;
      }
      if (
        startDate < booking.startDate &&
        booking.startDate < endDate &&
        endDate < booking.endDate
      ) {
        bool = false;
        console.log("yee12");
        // dispatch(getAlreadyBooked(true));
        return;
      }
      if (startDate < booking.startDate && booking.endDate < endDate) {
        bool = false;
        console.log("yee13");
        // dispatch(getAlreadyBooked(true));
        return;
      }
      if (
        booking.startDate < startDate &&
        booking.endDate < endDate &&
        startDate < booking.endDate
      ) {
        bool = false;
        console.log("yee14");
        // dispatch(getAlreadyBooked(true));
        return;
      }
      // dispatch(getAlreadyBooked(false));
      bool = true;
    }
  });
  useEffect(() => {
    getAlreadyBooked(false);
  }, [dispatch]);
  return (
    <>
      {bool === true && (
        <button className={styles.btn} onClick={() => setShowModal(true)}>
          Reserve
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
