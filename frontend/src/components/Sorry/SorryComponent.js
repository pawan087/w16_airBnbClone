import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import styles from "../../components/Sorry/SorryComponent.module.css";

export default function SorryComponent({ noBookings }) {
  const history = useHistory();

  const user = useSelector((state) => state.session.user);
  const searchCriteria = useSelector((state) => state.search);

  let message;
  let searchedStartDate = searchCriteria.startDate;
  let searchedEndDate = searchCriteria.endDate;

  if (searchCriteria.startDate)
    searchedStartDate = searchedStartDate.toISOString().split("T")[0];
  if (searchCriteria.endDate)
    searchedEndDate = searchedEndDate.toISOString().split("T")[0];

  const [location] = useState(searchCriteria.searchInput);

  if (!location) {
    message = "Sorry we couldn't find what you were looking for.";
  }

  if (location && searchedStartDate && searchedStartDate) {
    message = `Sorry, we couldn't find anything in ${
      searchCriteria.searchInput
    } between ${searchedStartDate.slice(5)} and ${searchedEndDate.slice(5)}`;
  }

  if (noBookings) {
    message = `You haven't booked any adventures yet, ${user.username}.`;
  }

  const linkMe = (e) => {
    e.preventDefault();
    history.push(`/spots`);
  };

  let imgUrl =
    "https://a0.muscache.com/im/pictures/57b9f708-bb12-498c-bc33-769f8fc43e63.jpg?im_w=2560";

  useEffect(() => {}, [searchCriteria]);

  return (
    <div className={styles.splashContainer}>
      <img alt='backgroundImg' className={styles.bannerImg} src={imgUrl}></img>

      <div className={styles.splashText}>
        <p className={styles.message}>{message}</p>

        <button onClick={(e) => linkMe(e)} className={styles.splashBtn}>
          Go Back
        </button>
      </div>
    </div>
  );
}
