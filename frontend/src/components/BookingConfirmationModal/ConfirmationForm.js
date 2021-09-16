import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "../../components/BookingConfirmationModal/ConfirmationForm.module.css";
function ConfirmationForm() {
  const dispatch = useDispatch();

  return (
    <div className={styles.testing}>
      <h1>Booking Confirmation Testing</h1>
    </div>
  );
}

export default ConfirmationForm;
