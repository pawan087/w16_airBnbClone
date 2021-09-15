import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getBookings } from "../../store/bookings";
import { getSpots } from "../../store/spots";

export default function SearchContainer() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const searchCriteria = useSelector((state) => state.search);
  let searchedStartDate = searchCriteria.startDate;
  let searchedEndDate = searchCriteria.endDate;

  if (searchCriteria.startDate)
    searchedStartDate = searchedStartDate.toISOString().split("T")[0];
  if (searchCriteria.endDate)
  searchedEndDate = searchedEndDate.toISOString().split("T")[0];
  const [location, setLocation] = useState(searchCriteria.searchInput);
  const [startDate, setStartDate] = useState(searchedStartDate);
  const [endDate, setEndDate] = useState(searchedEndDate);
  const [errors, setErrors] = useState([]);
  const bookings = useSelector((state) => state.booking);
  const spots = useSelector((state) => state.spot);
  const spotsArr = Object.values(spots);
  const bookingArr = Object.values(bookings);
  let arr = [];
  let today = new Date();
  bookingArr.forEach((booking) => {
    if (booking["Spot"]["city"] === location && startDate && endDate) {
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
  }, [dispatch, searchCriteria]);

  // if (!sessionUser) return <Redirect to="/" />;

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
            min={today.toISOString().split("T")[0]}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </label>
        <label>
          End Date
          <input
            type="date"
            value={endDate}
            min={today.toISOString().split("T")[0]}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </label>
        <button type="submit">Search</button>
      </form>

      <ul>
        {arr.map((e) => (
          <a href={`http://localhost:3000/spots/${e.id}`}>{e.name}</a>
        ))}
      </ul>
    </>
  );
}
