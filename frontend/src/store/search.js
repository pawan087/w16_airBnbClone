import { csrfFetch } from "./csrf";

const SET_SEARCH = "search/setSearch";

const setSearch = (searchCriteria) => ({
  type: SET_SEARCH,
  searchCriteria,
});

export const getSearch = (searchCriteria) => async (dispatch) => {
  dispatch(setSearch(searchCriteria));
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

export default searchReducer;
