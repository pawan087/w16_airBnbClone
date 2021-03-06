import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { DateRangePicker } from "react-date-range";
import { useHistory } from "react-router-dom";

import * as searchAction from "../../store/search";
import * as sessionActions from "../../store/session";

import styles from "../../components/Header/HeaderComponent.module.css";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

export default function HeaderComponent() {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.session.user);

  let today = new Date();
  let tomorrow = new Date();
  let initialStartDate = today;

  tomorrow.setDate(today.getDate() + 1);
  today = today.toISOString().split("T")[0];

  let initial = "";

  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(tomorrow);
  const [showMenu, setShowMenu] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  initial = user?.username[0]?.toUpperCase();

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  if (searchInput) {
    document.getElementById("navbar").style.background = "#F3F4F6";
  }

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  let imgUrl =
    "https://logos-world.net/wp-content/uploads/2020/07/Airbnb-Logo-2008-2014.png";

  const logout = (e) => {
    e.preventDefault();

    dispatch(sessionActions.logout());

    if (window.location.pathname !== "/") {
      history.push("/");
    }
  };

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);

    setEndDate(ranges.selection.endDate);
  };

  const resetInput = () => {
    setSearchInput("");
  };

  const handleSubmit = (e) => {
    if (!searchInput) {
      return;
    }

    e.preventDefault();

    dispatch(
      searchAction.getSearchResults({ searchInput, startDate, endDate })
    );

    dispatch(searchAction.getSearch({ searchInput, startDate, endDate }));

    setSearchInput("");

    history.push("/search");
  };

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  const handleDemoLogin = (e) => {
    e.preventDefault();
    let credential = "Demo-lition";

    let password = "password";

    dispatch(sessionActions.login({ credential, password }));
    if (window.location.pathname === "/") {
      // window.location.reload();
    } else {
      history.push("/");
    }
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu, searchInput]);

  return (
    <header id="navbar" className={styles.headerContainer}>
      <div className={styles.leftHeader}>
        <a className={styles.imgContainer} href="/">
          <img
            className={styles.logo}
            src={imgUrl}
            alt="airBnbClone-logo"
          ></img>
        </a>
      </div>

      <div className={styles.middleHeader}>
        <input
          className={styles.searchInput}
          type="text"
          onKeyPress={handleKeypress}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Find your next adventure"
        />

        <div onClick={handleSubmit} className={styles.searchIcon}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <div className={styles.rightHeader}>
        <div className={styles.userContainer}>
          {initial && (
            <div data-tooltip="This is a tooltip" className={styles.user}>
              {initial}
            </div>
          )}
        </div>

        <div className={styles.rightIconsContainer} onClick={openMenu}>
          <div className={styles.menuIcon}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>

          <div className={styles.userIcon}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        {showMenu && (
          <div className={styles.outerContainer}>
            {user ? (
              <NavLink className={styles.menuItem} to="/bookings">
                Bookings
              </NavLink>
            ) : null}

            {user ? (
              <div className={styles.menuItem} onClick={logout}>
                Log Out
              </div>
            ) : null}

            {!user ? (
              <NavLink to="/login" className={styles.menuItem}>
                Log In
              </NavLink>
            ) : null}

            {!user ? (
              <div
                onClick={(e) => handleDemoLogin(e)}
                className={styles.menuItem}
              >
                Demo User
              </div>
            ) : null}

            {!user ? (
              <NavLink to="/signup" className={styles.menuItem}>
                Sign Up
              </NavLink>
            ) : null}
          </div>
        )}
      </div>

      {searchInput && (
        <div className={styles.dateRangePickerContainer}>
          <DateRangePicker
            className={styles.dateRangePicker}
            onChange={handleSelect}
            rangeColors={["#009cd5"]}
            minDate={initialStartDate}
            ranges={[selectionRange]}
          />

          <div className={styles.searchBtnsContainer}>
            <button onClick={resetInput} className={styles.cancelSearchBtn}>
              Cancel
            </button>

            <button onClick={handleSubmit} className={styles.submitSearchBtn}>
              Search
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
