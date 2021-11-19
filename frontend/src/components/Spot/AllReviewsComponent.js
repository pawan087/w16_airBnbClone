import { useDispatch, useSelector } from "react-redux";

import { delReview } from "../../store/reviews";

import styles from "../../components/Spot/AllReviewsComponent.module.css";

export default function AllReviewsComponent({ reviewsArr }) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);

  let username;

  if (user) {
    username = user.username;
  }

  const deleteReview = (r) => {
    dispatch(delReview(r));
  };

  return (
    <div className={styles.outerContainer}>
      {reviewsArr
        .slice(0)
        .reverse()
        .map((review) => (
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
              <div className={styles.userInfo}>{username}</div>
            </div>

            <div className={styles.reviewContent}>{review["review"]}</div>

            <div
              className={styles.deleteContainer}
              onClick={() => deleteReview(review)}
            >
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>
        ))}
    </div>
  );
}
