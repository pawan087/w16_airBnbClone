import styles from "../../components/Sorry/SorryComponent.module.css";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function SorryComponent() {
    let message;

  const dispatch = useDispatch();
  const history = useHistory();
  const searchCriteria = useSelector((state) => state.search);
  let searchedStartDate = searchCriteria.startDate;
  let searchedEndDate = searchCriteria.endDate;
  if (searchCriteria.startDate)
    searchedStartDate = searchedStartDate.toISOString().split("T")[0];
  if (searchCriteria.endDate)
    searchedEndDate = searchedEndDate.toISOString().split("T")[0];
  const [location, setLocation] = useState(searchCriteria.searchInput);
  useEffect(() => {}, [searchCriteria]);
  if (!location) {
    message = "Sorry we couldn't find what you were looking for.";
  }
  if (location && searchedStartDate && searchedStartDate) {
      message = `Sorry, we couldn't find anything in ${location} between ${searchedStartDate.slice(5)} and ${searchedEndDate.slice(5)}`
  }

  const linkMe = (e) => {
    e.preventDefault();
    history.push(`/spots`);
  };
  let imgUrl =
    "https://a0.muscache.com/im/pictures/57b9f708-bb12-498c-bc33-769f8fc43e63.jpg?im_w=2560";
  return (
    <div className={styles.splashContainer}>
      <img className={styles.bannerImg} src={imgUrl}></img>
      <div className={styles.splashText}>
        <p className={styles.message}>{message}</p>
        <button onClick={(e) => linkMe(e)} className={styles.splashBtn}>
            Go Back
        </button>
      </div>
    </div>
  );
}
