import React, { useState } from "react";
import { MyThirdModal } from "../../context/EditBooking";
import styles from "../../components/EditBookingModal/index.module.css";
import EditBookingForm from "./EditBookingForm";
function EditBookingModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div onClick={() => setShowModal(true)} className={styles.edit}>
        Edit reservation
      </div>

      {showModal && (
        <MyThirdModal onClose={() => setShowModal(false)}>
          <EditBookingForm />
        </MyThirdModal>
      )}
    </>
  );
}

export default EditBookingModal;
