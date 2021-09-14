import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect, Route } from "react-router-dom";

import { getSpots } from "../../store/spots";

export default function SpotsContainer() {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spot);
  const spotsArr = Object.values(spots);
  const spot = spotsArr.filter((spot) => spot["id"] === +spotId);

  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch]);

  if (!spot) return <Redirect to="/" />;

  return (
    <ul>
    {spot.map((spot) => (
      <li>{spot.name}</li>
    ))}
  </ul>
  );
}
