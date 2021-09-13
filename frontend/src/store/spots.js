const SET_SPOTS = "spots/setSpots";

const setSpots = (spots) => ({
  type: SET_SPOTS,
  spots,
});

export const getSpots = () => async (dispatch) => {
  const res = await fetch("/api/spots");
  const spots = await res.json();
  dispatch(setSpots(spots));
};

const initialState = {};

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SPOTS:
      const newState = {};
      action.spots.forEach((spot) => (newState[spot.id] = spot));
      return newState;
    default:
      return state;
  }
};

export default spotsReducer;
