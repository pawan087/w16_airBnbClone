import React, { useState } from "react";
import { MyModal } from "../../context/BookingConfirmation";
import ConfirmationForm from "./ConfirmationForm";
import styles from "../../components/TestSpot/ReserveFormContainer.module.css";
function BookingConfirmationModal({ spot, endDate, startDate }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className={styles.btn} onClick={() => setShowModal(true)}>
        Reserve
      </button>
      {showModal && startDate && endDate && (
        <MyModal onClose={() => setShowModal(false)}>
          <ConfirmationForm spot={spot} startDate={startDate} endDate={endDate} />
        </MyModal>
      )}
    </>
  );
}

export default BookingConfirmationModal;
