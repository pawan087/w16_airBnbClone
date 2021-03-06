import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import configureStore from "./store";
import { restoreCSRF, csrfFetch } from "./store/csrf";

import { ModalProvider } from "./context/Modal";
import { BookingConfirmationProvider } from "./context/BookingConfirmation";
import { CancelBookingConfirmationProvider } from "./context/CancelBookingConfirmation";
import { EditBookingProvider } from "./context/EditBooking";

import * as sessionActions from "./store/session";

import "./index.css";

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}

function Root() {
  return (
    <Provider store={store}>
      <ModalProvider>
        <BookingConfirmationProvider>
          <CancelBookingConfirmationProvider>
            <EditBookingProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </EditBookingProvider>
          </CancelBookingConfirmationProvider>
        </BookingConfirmationProvider>
      </ModalProvider>
    </Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById("root")
);
