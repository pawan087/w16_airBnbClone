import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as bookingActions from "../../store/bookings";
import CancelBookingConfirmaitonModal from "../BookingConfirmationModal/index";
export default function NewBookingForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [userId, setUserId] = useState("");
  const [spotId, setSpotId] = useState("");
  const [startDate, setStateDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [errors, setErrors] = useState([]);

  if (!sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();

    return dispatch(
      bookingActions.create({ userId, spotId, startDate, endDate })
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
        Start Date
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStateDate(e.target.value)}
          required
        />
      </label>
      <label>
        End Date
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
      </label>
      <button type="submit">Book!</button>
    </form>
  );
}
