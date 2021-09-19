import { batch } from "react-redux";
import { csrfFetch } from "./csrf";

const SET_BOOKINGS = "bookings/setBookings";
const DELETE_BOOKING = "bookings/deleteBooking";
const EDIT_BOOKING = "bookings/editBooking";
const SET_USER_BOOKINGS = "bookings/setUserBookings";
const ALREADY_BOOKED = "bookings/setAlreadyBooked";
const ADD_BOOKING = "bookings/addBooking";

const addBooking = (booking) => ({
  type: ADD_BOOKING,
  booking,
});

const setAlreadyBooked = (bool) => ({
  type: ALREADY_BOOKED,
  bool,
});

const setUserBookings = (bookings) => ({
  type: SET_USER_BOOKINGS,
  bookings,
});

const eBooking = (booking) => ({
  type: EDIT_BOOKING,
  booking,
});

const setBookings = (bookings) => ({
  type: SET_BOOKINGS,
  bookings,
});

const deleteBooking = (id) => ({
  type: DELETE_BOOKING,
  id: id,
});

export const delBooking = (b) => async (dispatch) => {
  const { id } = b;
  await csrfFetch("/api/bookings", {
    method: "DELETE",
    body: JSON.stringify({
      id,
    }),
  });
  dispatch(deleteBooking(id));
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
  const b = await response.json();
  dispatch(addBooking(b));

};

export const editBooking = (booking) => async (dispatch) => {
  const { bookingId, startDate, endDate } = booking;

  const res = await csrfFetch("/api/bookings/update", {
    method: "PUT",
    body: JSON.stringify({
      startDate,
      endDate,
      bookingId,
    }),
  });
  const updatedBooking = await res.json();
  dispatch(eBooking(updatedBooking));
};

export const getBookings = () => async (dispatch) => {
  const res = await fetch("/api/bookings");
  const bookings = await res.json();
  dispatch(setBookings(bookings));
};

export const getAlreadyBooked = (b) => async (dispatch) => {
  dispatch(setAlreadyBooked(b));
};

export const getUserBookings = (id) => async (dispatch) => {
  const res = await fetch("/api/bookings");
  const bookings = await res.json();
  let userBookings = bookings.filter((booking) => booking.userId === id);
  dispatch(setUserBookings(userBookings));
};

const initialState = {};
/* case DELETE_THING:
const id = action.thingId
delete state[id]
return { ...state }; */

const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BOOKINGS:
      const newState = {};
      action.bookings.forEach((booking) => (newState[booking.id] = booking));
      return newState;
    case DELETE_BOOKING:
      const id = action.id;

      delete state[id];
      return { ...state };
    case EDIT_BOOKING:
      const id2 = action.booking.id;
      state[id2] = action.booking;
      return { ...state };

    case ADD_BOOKING:


      return { ...state, ...action.booking };
    default:
      return state;
  }
};

const initialState2 = {};

export const userBookingReducer = (state = initialState2, action) => {
  switch (action.type) {
    case SET_USER_BOOKINGS:
      const newState = {};
      action.bookings.forEach((booking) => (newState[booking.id] = booking));
      return newState;
    default:
      return state;
  }
};

const initialState3 = {};

export const alreadyBookedReducer = (state = initialState3, action) => {
  switch (action.type) {
    case ALREADY_BOOKED:
      return action.bool;
    default:
      return false;
  }
};

export default bookingReducer;
