import React, { useState } from "react";
import { MySecondModal } from "../../context/CancelBookingConfirmation";
import ConfirmationForm from "./ConfirmationForm";
import styles from "../../components/TestSpot/ReserveFormContainer.module.css";
import styles2 from "../../components/CancelBookingConfirmationModal/index.module.css";
function CancelBookingConfirmationModal( {booking, bookingId, startDate, endDate, name, username}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div
        onClick={() => setShowModal(true)}
        className={styles2.deleteContainer}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
      {showModal && (
        <MySecondModal onClose={() => setShowModal(false)}>
          <ConfirmationForm booking={booking} bookingId={bookingId} startDate={startDate} endDate={endDate} name={name} username={username}/>
        </MySecondModal>
      )}
    </>
  );
}

export default CancelBookingConfirmationModal;