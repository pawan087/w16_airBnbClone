import styles from "../../components/Header/HeaderComponent.module.css";
import { SearchIcon } from "react-hero-icon";

export default function HeaderComponent() {
  let imgUrl =
    "https://logos-world.net/wp-content/uploads/2020/07/Airbnb-Logo-2008-2014.png";
  return (
    <header className={styles.headerContainer}>
      <div>
        <img className={styles.logo} src={imgUrl} alt="airBnbClone-logo"></img>
      </div>
      <div className={styles.middleHeader}>
        <input className={styles.searchInput} type="text" placeholder="Search" />
        <div className={styles.searchIcon}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <div>Right</div>
    </header>
  );
}
