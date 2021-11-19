import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { getSpots } from "../../store/spots";
import DetailCardComponent from "./DetailCardComponent";

import styles from "./SpotsContainer.module.css";

export default function SpotsContainer() {
  const dispatch = useDispatch();
  const history = useHistory();

  const spots = useSelector((state) => state.spot);
  const spotsArr = Object.values(spots);

  const linkMe = (e, id) => {
    e.preventDefault();

    history.push(`/spots/${id}`);
  };

  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch]);

  return (
    <>
      <div className={styles.outerContainer}>
        {spotsArr?.map((spot) => (
          <DetailCardComponent linkMe={linkMe} spot={spot} />
        ))}
      </div>
    </>
  );
}
