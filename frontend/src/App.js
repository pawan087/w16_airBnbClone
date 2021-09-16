import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import TestSpots from "./components/TestSpots/SpotsContainer";
import TestSpot from "./components/TestSpot/SpotContainer";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import TestBookings from "./components/TestBookings/BookingsContainer";
import TestNewBooking from "./components/NewBooking/BookingFormContainer";
import TestSearch from "./components/TestSearch/SearchContainer";
import HeaderComponent from "./components/Header/HeaderComponent";
import BannerComponent from "./components/Banner/BannerComponent";
import FooterComponent from "./components/Footer/FooterComponent";
import ReserveFormComponent from "./components/TestSpot/ReserveFormComponent";

function App() {
  const dispatch = useDispatch();

  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  <FooterComponent />;
  <Navigation isLoaded={isLoaded} />;
  return (
    <>
      <HeaderComponent />
      <BannerComponent />
      <FooterComponent />;
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
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
          <Route path="/bookings/new">
            <TestNewBooking />
          </Route>
          <Route path="/search">
            <TestSearch />
          </Route>
          <Route path="/reserve">
            <ReserveFormComponent />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
