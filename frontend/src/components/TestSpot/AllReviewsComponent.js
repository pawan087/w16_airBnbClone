import styles from "../../components/TestSpot/AllReviewsComponent.module.css";
export default function AllReviewsComponent({ reviewsArr }) {
  return (
    <div className={styles.outerContainer}>
      {reviewsArr.map((review) => (
        <div className={styles.reviewContainer}>
          <div className={styles.leftContainer}>
            <div className={styles.userIcon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className={styles.userInfo}>{review["userId"]}</div>
          </div>
          <div className={styles.reviewContent}>{review["review"]}</div>
        </div>
      ))}
    </div>
  );
}
