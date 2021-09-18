import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpots } from "../../store/spots";
import { useHistory } from "react-router-dom";
import styles from "./SpotsContainer.module.css";
import DetailCardComponent from "./DetailCardComponent";
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
        {spotsArr.map((spot) => (
          <DetailCardComponent linkMe={linkMe} spot={spot} />
        ))}
        {spotsArr.map((spot) => (
          <DetailCardComponent linkMe={linkMe} spot={spot} />
        ))}
        {spotsArr.map((spot) => (
          <DetailCardComponent linkMe={linkMe} spot={spot} />
        ))}
        {spotsArr.map((spot) => (
          <DetailCardComponent linkMe={linkMe} spot={spot} />
        ))}
        {spotsArr.map((spot) => (
          <DetailCardComponent linkMe={linkMe} spot={spot} />
        ))}
        {spotsArr.map((spot) => (
          <DetailCardComponent linkMe={linkMe} spot={spot} />
        ))}
      </div>
    </>
  );
}

/*    <a key={spot.id} href={`http://localhost:3000/spots/${spot.id}`}>
{spot.name}
</a> */

/* <div className={styles.outerContainer}>
  <DetailCardComponent />
  <DetailCardComponent />
  <DetailCardComponent />
  <DetailCardComponent />
  <DetailCardComponent />
  <DetailCardComponent />
  <DetailCardComponent />
  <DetailCardComponent />
  <DetailCardComponent />
  <DetailCardComponent />
  <DetailCardComponent />
  <DetailCardComponent />
</div> */
