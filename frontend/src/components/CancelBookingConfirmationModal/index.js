import React, { useState, useEffect } from "react";
import { MySecondModal } from "../../context/CancelBookingConfirmation";
import ConfirmationForm from "./ConfirmationForm";

import styles from "../../components/CancelBookingConfirmationModal/index.module.css";

function CancelBookingConfirmationModal({
  booking,
  bookingId,
  startDate,
  endDate,
  name,
  username,
}) {
  const [showModal, setShowModal] = useState(false);

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
      <div
        onClick={() => setShowModal(true)}
        className={styles.deleteContainer}
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
          <ConfirmationForm
            setShowModal={setShowModal}
            booking={booking}
            bookingId={bookingId}
            startDate={startDate}
            endDate={endDate}
            name={name}
            username={username}
          />
        </MySecondModal>
      )}
    </>
  );
}

export default CancelBookingConfirmationModal;
