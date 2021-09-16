import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as reviewActions from "../../store/reviews";
import styles from "../../components/TestSpot/ReviewFormContainer.module.css";
export default function ReviewFormContainer({ spot }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  let spotId;
  if (spot[0]) {
    spotId = spot[0].id;
  }
  const [review, setReview] = useState("");
  const [errors, setErrors] = useState([]);
  let userId;
  if (sessionUser) {
    userId = sessionUser.id;
  }

  // if (!sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();

    return dispatch(reviewActions.create({ userId, spotId, review })).catch(
      async (res) => {
        // const data = await res.json();
      }
    );
  };

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)} className={styles.outerContainer}>
        <div className={styles.labelContainer}>
          <div className={styles.icon}>
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
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </div>
          <label className={styles.label}>Add a written review</label>
        </div>

        <div className={styles.textAreaContainer}>
          <textarea
            onChange={(e) => setReview(e.target.value)}
            value={review}
            className={styles.textArea}
            type="textarea"
          ></textarea>
        </div>
        <div className={styles.btnContainer}>
          <button className={styles.btn} type="submit">
            Submit
          </button>
        </div>
      </form>
    </>
  );
}
