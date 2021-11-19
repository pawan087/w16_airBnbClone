import styles from "../../components/Footer/FooterComponent.module.css";

export default function FooterComponent() {
  return (
    <footer id="footer" class={styles.footer}>
      <div class={styles.footerContent}>
        <a href="/">
          <img
            class={styles.footerLogo}
            alt="blueLogo"
            src="https://logos-world.net/wp-content/uploads/2020/07/Airbnb-Logo-2008-2014.png"
          ></img>
        </a>
      </div>
    </footer>
  );
}
