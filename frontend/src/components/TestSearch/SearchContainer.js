import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getBookings } from "../../store/bookings";
import { getSpots } from "../../store/spots";

export default function SearchContainer() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [location, setLocation] = useState("");
  const [startDate, setStateDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [errors, setErrors] = useState([]);

  const bookings = useSelector((state) => state.booking);
  const spots = useSelector((state) => state.spot);
  const spotsArr = Object.values(spots);
  const bookingArr = Object.values(bookings);
  let arr = [];
  let curTime = new Date();

  bookingArr.forEach((booking) => {
    // console.log(booking.startDate);
    if (booking["Spot"]["city"].toLowerCase() === location.toLowerCase()) {
      if (!(booking.startDate < startDate && endDate < booking.endDate)) {
        if (
          !(
            startDate < booking.startDate &&
            booking.startDate < endDate &&
            endDate < booking.endDate
          )
        )
          if (!(startDate < booking.startDate && booking.endDate < endDate)) {
            if (!(booking.startDate < startDate && booking.endDate < endDate)) {
              arr.push(booking["Spot"]);
            }
          }
      }
    }
  });

  useEffect(() => {
    dispatch(getBookings());
    dispatch(getSpots());
  }, [dispatch]);

  if (!sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(location);
    console.log(startDate);
    console.log(endDate);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Location
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
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
        <button type="submit">Search</button>
      </form>

      <ul>
        {arr.map((e) => (
          <li>{e.name}</li>
        ))}
      </ul>
    </>
  );
}
