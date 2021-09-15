import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getBookings } from "../../store/bookings";
import { getSpots } from "../../store/spots";

export default function SearchContainer() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const searchCriteria = useSelector((state) => state.search);
  const images = useSelector((state) => state.images);
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
  let searchResultsObj = {};

  // console.log(spotsArr[0].Images[0].url); // imgUrl
  // console.log(spotsArr[0].city); // location

  spotsArr.forEach((spot) => {
    if (spot.city === location) {
      searchResultsObj[spot.id] = spot;
    }
  });

  // console.log(bookingArr[0].Spot.city) // location
  // console.log(bookingArr[0].Spot.startDate) // startDate
  // console.log(bookingArr[0].Spot.endDate) // endDate

  bookingArr.forEach((booking) => {
    if (booking["Spot"]["city"] === location && startDate && endDate) {
      if (booking.startDate < startDate && endDate < booking.endDate) {
        searchResultsObj[booking["Spot"]["id"]] = null;
      }
      if (
        startDate < booking.startDate &&
        booking.startDate < endDate &&
        endDate < booking.endDate
      ) {
        searchResultsObj[booking["Spot"]["id"]] = null;
      }
      if (startDate < booking.startDate && booking.endDate < endDate) {
        searchResultsObj[booking["Spot"]["id"]] = null;
      }
      if (booking.startDate < startDate && booking.endDate < endDate) {
        searchResultsObj[booking["Spot"]["id"]] = null;
      }
    }
  });

  console.log(searchResultsObj);
  const arr = Object.values(searchResultsObj);
  let today = new Date();

  // bookingArr.forEach((booking) => {
  //   if (booking["Spot"]["city"] === location && startDate && endDate) {
  //     if (!(booking.startDate < startDate && endDate < booking.endDate)) {
  //       if (
  //         !(
  //           startDate < booking.startDate &&
  //           booking.startDate < endDate &&
  //           endDate < booking.endDate
  //         )
  //       )
  //         if (!(startDate < booking.startDate && booking.endDate < endDate)) {
  //           if (!(booking.startDate < startDate && booking.endDate < endDate)) {
  //             arr.push(booking["Spot"]);
  //           }
  //         }
  //     }
  //   }
  // });

  useEffect(() => {
    dispatch(getBookings());
    dispatch(getSpots());
    // dispatch(getImages());
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

      <div>
        {startDate && endDate && arr.map((s) => (
          <div>
            <a key={s.id} href={`http://localhost:3000/spots/${s.id}`}>
              {s.name}
            </a>
          </div>
        ))}
      </div>
    </>
  );
}
