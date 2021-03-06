import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";

import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;

  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <ul className="nav-bar">
      <li>
        <NavLink exact to="/">
          Home
        </NavLink>

        <NavLink to="/spots">Spots</NavLink>

        <NavLink to="/bookings">Bookings</NavLink>

        <NavLink to="/bookings/new">Book</NavLink>

        <NavLink to="/search">Search</NavLink>
        
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;
