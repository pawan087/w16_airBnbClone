import styles from "../../components/Footer/FooterComponent.module.css";

export default function FooterComponent() {
  return (
    <footer id="footer" className={styles.footer}>
      <div className={styles.footerContent}>
        <a href="/">
          <img
            className={styles.footerLogo}
            alt="blueLogo"
            src="https://logos-world.net/wp-content/uploads/2020/07/Airbnb-Logo-2008-2014.png"
          ></img>
        </a>
      </div>
    </footer>
  );
}
