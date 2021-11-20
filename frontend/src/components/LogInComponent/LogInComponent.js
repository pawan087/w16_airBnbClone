import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import * as sessionActions from "../../store/session";

import styles from "./LogInComponent.module.css";

function LogInComponent() {
  const dispatch = useDispatch();

  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const user = useSelector((state) => state.session.user);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors([]);

    // dispatch(sessionActions.login({ credential, password }));

    return await dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();

        if (data && data.errors) setErrors(data.errors);
      })
      .finally(() => {
        // setLoader(false);
      });
  };

  if (user) return <Redirect to="/" />;

  return (
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
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>

        <div className={styles.title}>Sign in</div>

        <ul className={styles.errors}>
          {errors?.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
      </div>

      <label className={styles.signupLabel}>
        Username or Email
        <input
          className={styles.signupInput}
          type="text"
          placeholder="Demo-lition"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
      </label>

      <label className={styles.signupLabel}>
        Password
        <input
          className={styles.signupInput}
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>

      <button className={styles.signupBtn} type="submit">
        Sign In
      </button>

      <div className={styles.headerFooter}>
        Don't have an account?{" "}
        <a className={styles.link} href={"/signup"}>
          Sign Up
        </a>
      </div>
    </form>
  );
}

export default LogInComponent;
