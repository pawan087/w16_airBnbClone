import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "../../components/BookingConfirmationModal/ConfirmationForm.module.css";
function ConfirmationForm() {
  const dispatch = useDispatch();

  return (
    <div className={styles.outerContainer}>
      <div className={styles.logoContainer}>
        <img className={styles.logo} src={'https://logos-world.net/wp-content/uploads/2020/07/Airbnb-Logo-2008-2014.png'} className={styles.logo}></img>
      </div>

      <div className={styles.cardContainer}>
        <div className={styles.topCardContainer}>
          <div className={styles.title}>Success</div>
          <div className={styles.subtitle}>Snoop's booking with Sally has been confirmed.</div>
        </div>
        <div className={styles.middleContainer}>
          <div className={styles.middleHeader}>Snoop's Itinerary</div>
          <div className={styles.divisor}></div>
          <div className={styles.label}>Date(s)</div>
          <div className={styles.detail}>Jan .05</div>
          <div className={styles.label}>Owner:</div>
          <div className={styles.detail}>Owen</div>
          <div className={styles.label}>Sitter</div>
          <div className={styles.detail}>Sally</div>
          <div className={styles.label}>You Paid:</div>
          <div className={styles.detail}>$21.00</div>
          <div className={styles.middleFooter}>
            Your sitter or dog walker will receive payment two days after the
            stay or walk ends.
          </div>
        </div>
        <div className={styles.btnsContainer}>
        <button className={styles.btnCancel}>Modify Reservation</button>
        <button className={styles.btnSubmit}>Send a Message</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationForm;
