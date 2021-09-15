import styles from "../../components/Footer/FooterComponent.module.css";

export default function FooterComponent() {
  return (
    <footer class={styles.footer}>
      <div class={styles.footerContent}>
        <img
          class={styles.footerLogo}
          src="https://logos-world.net/wp-content/uploads/2020/07/Airbnb-Logo-2008-2014.png"
        ></img>
      </div>
    </footer>
  );
}
