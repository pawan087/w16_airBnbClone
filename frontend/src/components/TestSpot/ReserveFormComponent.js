import styles from "../../components/TestSpot/ReserveFormContainer.module.css";
export default function ReserveFormComponent() {
  return (
    <div className={styles.outerContainer}>
      <div className={styles.header}>
        $489<span className={styles.perNight}>/night</span>
      </div>
      <div className={styles.inputsContainer}>
        <div className={styles.datesInputContainer}>
          <div className={styles.inputContainer}>
            <label className={styles.label}>Check-In</label>
            <input className={styles.dateInput} type="date"></input>
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.label}>Check-Out</label>
            <input className={styles.dateInput} type="date"></input>
          </div>
        </div>
        <div className={styles.guestInputContainer}>
          <label className={styles.guestLabel}>Guests</label>
          <input className={styles.guestInput} type="number"></input>
        </div>
      </div>
      <div className={styles.btnContainer}>
        <button className={styles.btn}>Reserve</button>
      </div>
      <div className={styles.detailsContainer}>
        <div className={styles.detailContainer}>
          <div className={styles.detail}>$515 x 7 nights</div>
          <div className={styles.detailTotal}>$3,604</div>
        </div>
        <div className={styles.detailContainer}>
          <div className={styles.detail}>Weekly discount</div>
          <div className={styles.detailTotal}>-$180</div>
        </div>
        <div className={styles.detailContainer}>
          <div className={styles.detail}>Cleaning fee</div>
          <div className={styles.detailTotal}>$275</div>
        </div>
        <div className={styles.detailContainer}>
          <div className={styles.detail}>Service fee</div>
          <div className={styles.detailTotal}>$522</div>
        </div>
        <div className={styles.detailContainer}>
          <div className={styles.detail}>Occupancy taxes and fees</div>
          <div className={styles.detailTotal}>$444</div>
        </div>
      </div>
      <div className={styles.divisorContainer}>
        <p className={styles.divisor}></p>
        <div className={styles.footer}>
          <div className={styles.footerDetail}>Total</div>
          <div className={styles.footerDetail}>$4,665</div>
        </div>
      </div>
    </div>
  );
}
