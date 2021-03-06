// import { csrfFetch } from "./csrf";

const SET_SEARCH = "search/setSearch";
const SET_SEARCH2 = "search2/setSearch2";
const SET_SEARCH_RESULTS = "search/setSearchResults";

const SET_DATES = "search/setDates";

const setDatesActionCreator = (datesArr) => ({
  type: SET_DATES,
  datesArr,
});

const setSearch = (searchCriteria) => ({
  type: SET_SEARCH,
  searchCriteria,
});

const setSearch2 = (searchCriteria) => ({
  type: SET_SEARCH2,
  searchCriteria,
});

const setSearchResults = (searchResults) => ({
  type: SET_SEARCH_RESULTS,
  searchResults,
});

export const getSearch = (searchCriteria) => async (dispatch) => {
  dispatch(setSearch(searchCriteria));
};

export const getSearch2 = (searchCriteria) => async (dispatch) => {
  dispatch(setSearch2(searchCriteria));
};

export const setDates = (startDate, endDate) => async (dispatch) => {
  dispatch(setDatesActionCreator([startDate, endDate]));
};

export const getSearchResults = (searchCriteria) => async (dispatch) => {
  // const res = await fetch("/api/bookings");
  // const bookings = await res.json();

  const res2 = await fetch("/api/spots");
  const spots = await res2.json();

  const searchResultsObj = {};

  // const startDate = new Date(searchCriteria.startDate);
  // const endDate = new Date(searchCriteria.endDate);
  const location = searchCriteria.searchInput;

  spots.forEach((spot) => {
    if (
      spot.city.trim().toLowerCase().includes(location.trim().toLowerCase())
    ) {
      searchResultsObj[spot.id] = spot;
    }
    if (
      spot.city.trim().toLowerCase().includes(location.trim().toLowerCase())
    ) {
      searchResultsObj[spot.id] = spot;
    }
  });

  // bookings.forEach((booking) => {
  //   if (
  //     booking["Spot"]["city"].trim().toLowerCase().includes(location) &&
  //     startDate &&
  //     endDate
  //   ) {
  //     const bookingStartDate = new Date(booking.startDate);
  //     const bookingEndDate = new Date(booking.endDate);

  //     if (
  //       bookingStartDate.getTime() < startDate.getTime() &&
  //       endDate.getTime() < bookingEndDate.getTime()
  //     ) {
  //       delete searchResultsObj[booking["Spot"]["id"]];
  //     }

  //     if (
  //       startDate.getTime() < bookingStartDate.getTime() &&
  //       bookingStartDate.getTime() < endDate.getTime() &&
  //       endDate.getTime() < bookingEndDate.getTime()
  //     ) {
  //       delete searchResultsObj[booking["Spot"]["id"]];
  //     }

  //     if (
  //       startDate.getTime() < bookingStartDate.getTime() &&
  //       bookingEndDate.getTime() < endDate.getTime()
  //     ) {
  //       delete searchResultsObj[booking["Spot"]["id"]];
  //     }

  //     if (
  //       bookingStartDate.getTime() < startDate.getTime() &&
  //       bookingEndDate.getTime() < endDate.getTime() &&
  //       startDate.getTime() < bookingStartDate.getTime()
  //     ) {
  //       delete searchResultsObj[booking["Spot"]["id"]];
  //     }
  //   }
  // });

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

export const searchReducer2 = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH2:
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

export const dateReducer = (state, action) => {
  switch (action.type) {
    case SET_DATES:
      return action.datesArr;
    default:
      return [];
  }
};

export default searchReducer;
