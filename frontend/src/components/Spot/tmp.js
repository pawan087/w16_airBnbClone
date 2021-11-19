import React, { useState } from "react";
import { useDispatch } from "react-redux";

import * as reviewActions from "../../store/reviews";
import styles from "./ReviewFormContainer.module.css";

export default function ReviewFormContainer() {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState("");
  const [spotId, setSpotId] = useState("");
  const [review, setReview] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    return dispatch(reviewActions.create({ userId, spotId, review }));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          userId
          <input
            type="number"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </label>

        <label>
          spotId
          <input
            type="number"
            value={spotId}
            onChange={(e) => setSpotId(e.target.value)}
            required
          />
        </label>

        <label>
          Leave a review
          <input
            type="textarea"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          />
        </label>

        <button type="submit">Submit</button>
      </form>

      <form className={styles.outerContainer}>
        <div className={styles.labelContainer}>
          <label className={styles.label}>Add a written rview</label>
        </div>

        <div className={styles.textAreaContainer}>
          <input className={styles.input} type="textarea"></input>
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
