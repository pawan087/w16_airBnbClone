import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpots } from "../../store/spots";

export default function SpotsContainer() {
  const dispatch = useDispatch();

  const spots = useSelector((state) => state.spot);
  const spotsArr = Object.values(spots);

  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch]);

  return (
    <>
      {spotsArr.map((spot) => (
        <a key={spot.id} href={`http://localhost:3000/spots/${spot.id}`}>
          {spot.name}
        </a>
      ))}
    </>
  );
}
