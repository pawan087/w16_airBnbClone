import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import styles from "../../components/SignupFormPage/SignupForm.module.css";
import * as sessionActions from "../../store/session";

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
    <form onSubmit={handleSubmit} className={styles.signupForm}>
      <ul className={styles.errors}>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
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
      <button className={styles.signupBtn} type="submit">Sign Up</button>
    </form>
  );
}

export default SignupFormPage;
