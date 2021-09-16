import styles from "../../components/Header/NewSubMenu.module.css";
export default function NewSubMenu() {
  return (
    <div className={styles.outerContainer}>
      <div className={styles.menuItem}>Log In</div>
      <div className={styles.menuItem}>Sign Up</div>
      <div className={styles.menuItem}>Demo User</div>
    </div>
  );
}
