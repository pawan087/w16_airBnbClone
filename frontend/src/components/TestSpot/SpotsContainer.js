import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getSpots } from "../../store/spots";

export default function SpotsContainer() {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots);
  // const spotsArr = Object.values(spots);
  console.log(spots);

  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch]);

  return (
    <>
      <h1>Testing Spots Here</h1>
    </>
  );
}
