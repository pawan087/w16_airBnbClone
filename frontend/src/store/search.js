import { csrfFetch } from "./csrf";

const SET_SEARCH = "search/setSearch";
const SET_SEARCH_RESULTS = "search/setSearchResults";

const setSearch = (searchCriteria) => ({
  type: SET_SEARCH,
  searchCriteria,
});

const setSearchResults = (searchResults) => ({
  type: SET_SEARCH_RESULTS,
  searchResults,
});

export const getSearch = (searchCriteria) => async (dispatch) => {
  dispatch(setSearch(searchCriteria));
};

export const getSearchResults = (searchCriteria) => async (dispatch) => {
  const res = await fetch("/api/bookings");
  const bookings = await res.json();
  const res2 = await fetch("/api/spots");
  const spots = await res2.json();
  const searchResultsObj = {};
  const startDate = new Date(searchCriteria.startDate);
  const endDate = new Date(searchCriteria.endDate);
  const location = searchCriteria.searchInput;
  spots.forEach((spot) => {
    if (spot.city.trim().toLowerCase().includes(location.trim().toLowerCase())) {
      searchResultsObj[spot.id] = spot;
    }
    if (spot.city.trim().toLowerCase().includes(location.trim().toLowerCase())) {
      searchResultsObj[spot.id] = spot;
    }
  });
  console.log(searchResultsObj)


  bookings.forEach((booking) => {
    if (booking["Spot"]["city"].trim().toLowerCase().includes(location) && startDate && endDate) {
      const bookingStartDate = new Date(booking.startDate);
      const bookingEndDate = new Date(booking.endDate);
      // console.log(bookingStartDate.getTime() < startDate.getTime())
      if (
        bookingStartDate.getTime() < startDate.getTime() &&
        endDate.getTime() < bookingEndDate.getTime()
      ) {
        // searchResultsObj[booking["Spot"]["id"]] = null;
        delete searchResultsObj[booking["Spot"]["id"]];
      }
      if (
        startDate.getTime() < bookingStartDate.getTime() &&
        bookingStartDate.getTime() < endDate.getTime() &&
        endDate.getTime() < bookingEndDate.getTime()
      ) {
        delete searchResultsObj[booking["Spot"]["id"]];
      }
      if (
        startDate.getTime() < bookingStartDate.getTime() &&
        bookingEndDate.getTime() < endDate.getTime()
      ) {
        delete searchResultsObj[booking["Spot"]["id"]];
      }
      if (
        bookingStartDate.getTime() < startDate.getTime() &&
        bookingEndDate.getTime() < endDate.getTime()
      ) {
        delete searchResultsObj[booking["Spot"]["id"]];
      }
    }
  });
  dispatch(setSearchResults(searchResultsObj));
};

const initialState = {};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH:
      const newState = { ...action.searchCriteria };
      return newState;
    default:
      return state;
  }
};

const initialState2 = {};

export const searchResultsReducer = (state = initialState2, action) => {
  switch (action.type) {
    case SET_SEARCH_RESULTS:
      const newState = { ...action.searchResults };
      return newState;
    default:
      return state;
  }
};

export default searchReducer;
