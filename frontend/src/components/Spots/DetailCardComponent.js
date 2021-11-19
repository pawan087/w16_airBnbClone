import { useHistory } from "react-router-dom";

import styles from "./SpotsContainer.module.css";

export default function DetailCardComponent({ spot }) {
  const history = useHistory();

  const linkMe = (e, id) => {
    e.preventDefault();
    history.push(`/spots/${id}`);
  };

  return (
    <>
      <div className={styles.detailContainer}>
        <div className={styles.detailUpperContainer}>
          <img
            onClick={(e) => linkMe(e, spot.id)}
            className={styles.img}
            alt="detailImg"
            src={spot.Images[0].url}
          ></img>

          <div className={styles.heart}>
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
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>
        </div>

        <div className={styles.detailLowerContainer}>
          <div className={styles.detailTitle}>{spot.city}</div>

          <div className={styles.detailSubtitle}> ${spot.price}/night</div>
        </div>
      </div>
    </>
  );
}
