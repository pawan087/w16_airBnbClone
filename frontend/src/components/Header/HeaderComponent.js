import styles from "../../components/Header/HeaderComponent.module.css";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import { Modal } from "../../context/Modal";
import LoginForm from "../LoginFormModal/LoginForm";

export default function HeaderComponent() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const user = useSelector((state) => state.session.user);
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
  }, [showMenu]);
  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  let imgUrl =
    "https://logos-world.net/wp-content/uploads/2020/07/Airbnb-Logo-2008-2014.png";

  return (
    <header id='navbar' className={styles.headerContainer}>
      <div className={styles.leftHeader}>
        <a href='/'>
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
          placeholder="Start your next adventure"
        />

        <div className={styles.searchIcon}>
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

        {showMenu && (
          <div className={styles.dropDownMenu}>
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
      </div>
    </header>
  );
}
