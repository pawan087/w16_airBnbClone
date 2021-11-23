import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useLocation } from "react-router-dom";

import SignupFormPage from "./components/SignupFormPage";
import Spots from "./components/Spots/SpotsContainer";
import Spot from "./components/Spot/SpotContainer";
import Bookings from "./components/Bookings/BookingsContainer";
import Search from "./components/Search/SearchContainer";
import HeaderComponent from "./components/Header/HeaderComponent";
import BannerComponent from "./components/Banner/BannerComponent";
import FooterComponent from "./components/Footer/FooterComponent";
import SorryComponent from "./components/Sorry/SorryComponent";
import LogInComponent from "./components/LogInComponent/LogInComponent";

import * as sessionActions from "./store/session";

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
            <Spots />
          </Route>

          <Route path="/spots/:spotId">
            <Spot />
          </Route>

          <Route exact path="/bookings">
            <Bookings />
          </Route>

          <Route path="/search">
            <Search />
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
