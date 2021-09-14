import { csrfFetch } from "./csrf";

const SET_REVIEWS = "reviews/setReviews";
const CREATE_REVIEW = "reviews/createReview";

const setReviews = (reviews) => ({
  type: SET_REVIEWS,
  reviews,
});

const createReview = (review) => ({
  type: CREATE_REVIEW,
  review,
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
  dispatch(createReview(data.createdReview));
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
    case SET_REVIEWS: {
      let newState = {};
      action.reviews.forEach((review) => (newState[review.id] = review));
      return newState;
    }
    case CREATE_REVIEW: {
      let newState = { ...state };
      newState[action.review.id] = action.review;
      return newState;
    }
    default:
      return state;
  }
};

export default reviewReducer;
