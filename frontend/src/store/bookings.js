import { csrfFetch } from "./csrf";

const SET_BOOKINGS = "bookings/setBookings";
const DELETE_BOOKINGS = "bookings/deleteBooking";

const setBookings = (bookings) => ({
  type: SET_BOOKINGS,
  bookings,
});

export const delBooking = (r) => async (dispatch) => {
  const { id } = r;
  const response = await csrfFetch("/api/bookings", {
    method: "DELETE",
    body: JSON.stringify({
      id,
    }),
  });
  const bookings = await response.json();
  dispatch(setBookings(bookings));
  return response;
};

export const create = (booking) => async (dispatch) => {
  const { userId, spotId, startDate, endDate } = booking;
  const response = await csrfFetch("/api/bookings/new", {
    method: "POST",
    body: JSON.stringify({
      userId,
      spotId,
      startDate,
      endDate,
    }),
  });
  const data = await response.json();
  return response;
};

export const getBookings = () => async (dispatch) => {
  const res = await fetch("/api/bookings");
  const bookings = await res.json();
  dispatch(setBookings(bookings));
};

const initialState = {};

const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BOOKINGS:
      const newState = {};
      action.bookings.forEach((booking) => (newState[booking.id] = booking));
      return newState;
    default:
      return state;
  }
};

export default bookingReducer;
