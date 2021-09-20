import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import * as sessionActions from "../../store/session";

import styles from "../../components/SignupFormPage/SignupForm.module.css";

function SignupFormPage() {
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(
        sessionActions.signup({ email, username, password })
      ).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
    }
    return setErrors([
      "Confirm Password field must be the same as the Password field",
    ]);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.signupForm}>
        <div className={styles.titleContainer}>
          <div className={styles.icon}>
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
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>

          <div className={styles.title}>
            Create your <span className={styles.blue}>airBnb</span> account
          </div>

          <div className={styles.headerFooter}>
            Already have an account?{" "}
            <a className={styles.link} href={"/login"}>
              Log in
            </a>
            .
          </div>

          <ul className={styles.errors}>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        </div>

        <label className={styles.signupLabel}>
          Email
          <input
            type="text"
            className={styles.signupInput}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label className={styles.signupLabel}>
          Username
          <input
            type="text"
            value={username}
            className={styles.signupInput}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>

        <label className={styles.signupLabel}>
          Password
          <input
            type="password"
            value={password}
            className={styles.signupInput}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <label className={styles.signupLabel}>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            className={styles.signupInput}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>

        <button className={styles.signupBtn} type="submit">
          Sign Up
        </button>
      </form>
    </>
  );
}

export default SignupFormPage;
