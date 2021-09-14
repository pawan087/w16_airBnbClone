const SET_BOOKINGS = "bookings/setBookings";

const setBookings = (bookings) => ({
  type: SET_BOOKINGS,
  bookings,
});

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
