import styles from "../../components/TestSpot/ReserveFormContainer.module.css";
export default function ReserveFormComponent() {
  return (
    <div className={styles.outerContainer}>
      <div className={styles.header}>$489/night</div>
      <div className={styles.inputsContainer}>
        <div className={styles.inputContainer}>
          <label className={styles.label}>Check-In</label>
          <input className={styles.dateInput} type="date"></input>
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label}>Check-Out</label>
          <input className={styles.dateInput} type="date"></input>
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label}>Guests</label>
          <input className={styles.guestInput} type="number"></input>
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.button}>Reserve</button>
      </div>
      <div className={styles.detailsContainer}>
        <div className={styles.detailContainer}>
          <span className={styles.detail}>$515 x 7 nights</span>
          <span className={styles.detailTotal}>$3,604</span>
        </div>
        <div className={styles.detailsContainer}>
          <span className={styles.detail}>Weekly discount</span>
          <span className={styles.detailTotal}>-$180</span>
        </div>
        <div className={styles.detailsContainer}>
          <span className={styles.detail}>Cleaning fee</span>
          <span className={styles.detailTotal}>$275</span>
        </div>
        <div className={styles.detailsContainer}>
          <span className={styles.detail}>Service fee</span>
          <span className={styles.detailTotal}>$522</span>
        </div>
        <div className={styles.detailsContainer}>
          <span className={styles.detail}>Occupancy taxes and fees</span>
          <span className={styles.detailTotal}>$444</span>
        </div>
      </div>
      <div className={styles.divisorContainer}>
        <p className={styles.divisor}>_</p>
      </div>
      <div className={styles.footer}>
        <span className={styles.footerDetail}>Total</span>
        <span className={styles.footerDetail}>$4,665</span>
      </div>
    </div>
  );
}
