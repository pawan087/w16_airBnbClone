import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useLocation } from "react-router-dom";

import SignupFormPage from "./components/SignupFormPage";
import TestSpots from "./components/TestSpots/SpotsContainer";
import TestSpot from "./components/TestSpot/SpotContainer";
import TestBookings from "./components/TestBookings/BookingsContainer";
import TestSearch from "./components/TestSearch/SearchContainer";
import HeaderComponent from "./components/Header/HeaderComponent";
import BannerComponent from "./components/Banner/BannerComponent";
import FooterComponent from "./components/Footer/FooterComponent";
import SorryComponent from "./components/Sorry/SorryComponent";
import LogInComponent from "./components/LogInComponent/LogInComponent";

import * as sessionActions from "./store/session";
// import { AnimatePresence, motion } from "framer-motion";

function App() {
  const dispatch = useDispatch();

  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const location = useLocation();

  return (
    <>
      <HeaderComponent />
      {isLoaded && (
        <Switch location={location} key={location.pathname}>
          <Route exact path="/">
            <BannerComponent />
          </Route>

          <Route path="/signup">
            <SignupFormPage />
          </Route>

          <Route exact path="/spots">
            <TestSpots />
          </Route>

          <Route path="/spots/:spotId">
            <TestSpot />
          </Route>

          <Route exact path="/bookings">
            <TestBookings />
          </Route>

          <Route path="/search">
            <TestSearch />
          </Route>

          <Route path="/login">
            <LogInComponent />
          </Route>

          <Route>
            <SorryComponent />
          </Route>
        </Switch>
      )}

      <FooterComponent />
    </>
  );
}

export default App;
