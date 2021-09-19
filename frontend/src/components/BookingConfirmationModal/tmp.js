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
  const [showModal, setShowModal] = useState(false);
  const [showSecondModal, setSecondModal] = useState(false);
  const bookings = useSelector((state) => state.booking);
  const alreadyBooked = useSelector((state) => state.alreadyBooked);
  const bookingsArr = Object.values(bookings);
  const specificBookings = bookingsArr.filter((b) => {
    return b["spotId"] === +spotId;
  });
  specificBookings.forEach((booking) => {
    // console.log(startDate);
    // console.log(booking.startDate);
    if (startDate < endDate) {
      if (booking.startDate < startDate && endDate < booking.endDate) {
        dispatch(getAlreadyBooked(true));
        return;
      }
      if (
        startDate < booking.startDate &&
        booking.startDate < endDate &&
        endDate < booking.endDate
      ) {
        dispatch(getAlreadyBooked(true));
        return;
      }
      if (startDate < booking.startDate && booking.endDate < endDate) {
        dispatch(getAlreadyBooked(true));
        return;
      }
      if (
        booking.startDate < startDate &&
        booking.endDate < endDate &&
        startDate < booking.endDate
      ) {
        dispatch(getAlreadyBooked(true));
        return;
      }
      dispatch(getAlreadyBooked(false));
    }
  });
  useEffect(() => {
    getAlreadyBooked(false);
  }, [dispatch]);
  return (
    <>
      {!alreadyBooked && (
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
