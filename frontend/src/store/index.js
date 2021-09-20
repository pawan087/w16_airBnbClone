import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import bookingReducer from "./bookings";
import imageReducer from "./images";
import reviewReducer from "./reviews";
import searchReducer from "./search";
import sessionReducer from "./session";
import spotReducer from "./spots";
import { searchReducer2 } from "./search";
import { searchResultsReducer } from "./search";
import { userBookingReducer } from "./bookings";
import { dateReducer } from "./search";

const rootReducer = combineReducers({
  session: sessionReducer,
  spot: spotReducer,
  review: reviewReducer,
  booking: bookingReducer,
  search: searchReducer,
  images: imageReducer,
  userBookings: userBookingReducer,
  searchResults: searchResultsReducer,

  datesArr: dateReducer,
  search2: searchReducer2,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
