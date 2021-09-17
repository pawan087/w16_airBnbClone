import styles from "../../components/Header/HeaderComponent.module.css";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import * as searchAction from "../../store/search";
import * as sessionActions from "../../store/session";
import { Modal } from "../../context/Modal";
import LoginForm from "../LoginFormModal/LoginForm";
import { useHistory } from "react-router-dom";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import NewSubMenu from "./NewSubMenu";

export default function HeaderComponent() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const user = useSelector((state) => state.session.user);

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
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu, searchInput]);
  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  const resetInput = () => {
    setSearchInput("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchAction.getSearch({ searchInput, startDate, endDate }));

    setSearchInput('');
    history.push("/search");
  };

  let imgUrl =
    "https://logos-world.net/wp-content/uploads/2020/07/Airbnb-Logo-2008-2014.png";

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

        {false && (
          <div className={styles.dropDownMenu}>
            <div className={styles.dropDownHeader}>Welcome, Pawan.</div>
            {user ? (
              <NavLink className={styles.headerNavLink} to="/bookings">
                Bookings
              </NavLink>
            ) : null}
            {user ? (
              <button className={styles.dropDownItem} onClick={logout}>
                Log Out
              </button>
            ) : null}
            {!user ? (
              <button
                className={styles.dropDownItem}
                onClick={() => setShowModal(true)}
              >
                Log In
              </button>
            ) : null}
            {!user ? (
              <NavLink to="/signup" className={styles.headerNavLink}>
                Sign Up
              </NavLink>
            ) : null}
            {!user ? (
              <button className={styles.dropDownItem}>Demo User</button>
            ) : null}
            {showModal && (
              <Modal onClose={() => setShowModal(false)}>
                <LoginForm />
              </Modal>
            )}
          </div>
        )}
        {showMenu && (
          <div className={styles.outerContainer}>
          {!user ? <div className={styles.menuItem}>Demo User</div> : null}
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
            {!user ? <div className={styles.menuItem}>Log In</div> : null}
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
            minDate={new Date()}
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
