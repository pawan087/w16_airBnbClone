import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getSpots } from "../../store/spots";
import DetailCardComponent from "./DetailCardComponent";

import styles from "./SpotsContainer.module.css";
import 'mapbox-gl/dist/mapbox-gl.css';

export default function SpotsContainer() {
  const dispatch = useDispatch();

  const spots = useSelector((state) => state.spot);
  const spotsArr = Object.values(spots);

  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch]);

  return (
    <div className={styles.outerContainer}>
      {spotsArr?.map((spot, i) => (
        <DetailCardComponent key={i} spot={spot} />
      ))}
    </div>
  );
}
