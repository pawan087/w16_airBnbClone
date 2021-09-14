import { csrfFetch } from "./csrf";

const SET_REVIEWS = "reviews/setReviews";

const setReviews = (reviews) => ({
  type: SET_REVIEWS,
  reviews,
});

export const create = (r) => async (dispatch) => {
  const { userId, spotId, review } = r;
  const response = await csrfFetch("/api/reviews/new", {
    method: "POST",
    body: JSON.stringify({
      userId,
      spotId,
      review,
    }),
  });
  const data = await response.json();
  return response;
};

export const getReviews = () => async (dispatch) => {
  const res = await fetch("/api/reviews");
  const reviews = await res.json();
  dispatch(setReviews(reviews));
};

const initialState = {};

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_REVIEWS:
      const newState = {};
      action.reviews.forEach((review) => (newState[review.id] = review));
      return newState;
    default:
      return state;
  }
};

export default reviewReducer;
