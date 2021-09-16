import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as reviewActions from "../../store/reviews";
import styles from "../../components/TestSpot/ReviewFormContainer.module.css";
export default function ReviewFormContainer() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [userId, setUserId] = useState("");
  const [spotId, setSpotId] = useState("");
  const [review, setReview] = useState("");
  const [errors, setErrors] = useState([]);

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
