import React, { useState } from "react";
import { MyModal } from "../../context/BookingConfirmation";
import ConfirmationForm from "./ConfirmationForm";

function BookingConfirmationModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Confirm Booking</button>
      {showModal && (
        <MyModal onClose={() => setShowModal(false)}>
          <ConfirmationForm />
        </MyModal>
      )}
    </>
  );
}

export default BookingConfirmationModal;
