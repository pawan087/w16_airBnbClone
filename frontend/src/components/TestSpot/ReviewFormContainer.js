import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as bookingActions from "../../store/bookings";

export default function ReviewFormContainer() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [userId, setUserId] = useState("");
  const [spotId, setSpotId] = useState("");
  const [reviewContent, setReviewContent] = useState("");
  const [errors, setErrors] = useState([]);

  if (!sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();

    return dispatch(
      bookingActions.create({ userId, spotId, reviewContent })
    ).catch(async (res) => {
      const data = await res.json();
    });
  };

  return (
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
          value={reviewContent}
          onChange={(e) => setReviewContent(e.target.value)}
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
