import React, { useState } from "react";
import { MyModal } from "../../context/BookingConfirmation";
import { MyFourthModal } from "../../context/Sorry";
import ConfirmationForm from "./ConfirmationForm";
import styles from "../../components/TestSpot/ReserveFormContainer.module.css";
import Sorry from "./Sorry";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

function BookingConfirmationModal({ total, spot, endDate, startDate }) {
  const { spotId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [showSecondModal, setSecondModal] = useState(false);
  const bookings = useSelector((state) => state.booking);
  const bookingsArr = Object.values(bookings);
  const specificBookings = bookingsArr.filter((b) => {
    return b["spotId"] === +spotId;
  });
  specificBookings.forEach((booking) => {
    // console.log(startDate);
    // console.log(booking.startDate);

    if (booking.startDate < startDate && endDate < booking.endDate) {
      console.log("ALREADY BOOKED1");
      return
      // searchResultsObj[booking["Spot"]["id"]] = null;
      // delete searchResultsObj[booking["Spot"]["id"]];
    }
    if (
      startDate < booking.startDate &&
      booking.startDate < endDate &&
      endDate < booking.endDate
    ) {
      console.log("ALREADY BOOKED2");
      return
      // delete searchResultsObj[booking["Spot"]["id"]];
    }
    if (startDate < booking.startDate && booking.endDate < endDate) {
      console.log("ALREADY BOOKED3");
      return
      // delete searchResultsObj[booking["Spot"]["id"]];
    }
    if (booking.startDate < startDate && booking.endDate < endDate && startDate < booking.endDate) {
      console.log("ALREADY BOOKED4");
      return
      // delete searchResultsObj[booking["Spot"]["id"]];
    }
    console.log('NOT BOOKED')
  });
  return (
    <>
      <button className={styles.btn} onClick={() => setShowModal(true)}>
        Reserve
      </button>

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
