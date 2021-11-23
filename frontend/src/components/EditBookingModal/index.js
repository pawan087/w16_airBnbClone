import React, { useState } from "react";

import { MyThirdModal } from "../../context/EditBooking";
import EditBookingForm from "./EditBookingForm";

import styles from "../../components/EditBookingModal/index.module.css";

function EditBookingModal({ name, username, booking }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div onClick={() => setShowModal(true)} className={styles.edit}>
        <span>Edit reservation</span>
      </div>

      {showModal && (
        <MyThirdModal onClose={() => setShowModal(false)}>
          <EditBookingForm setShowModal={setShowModal} name={name} username={username} booking={booking} />
        </MyThirdModal>
      )}
    </>
  );
}

export default EditBookingModal;
