import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect, Route } from "react-router-dom";
import { getReviews } from "../../store/reviews";
import { getSpots } from "../../store/spots";
import ReviewFormContainer from "./ReviewFormContainer";

export default function SpotsContainer() {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spot);
  const reviews = useSelector((state) => state.review);
  const spotsArr = Object.values(spots);
  const reviewsArr = Object.values(reviews);
  const spot = spotsArr.filter((spot) => spot["id"] === +spotId);
  const specificReviews = reviewsArr.filter(
    (review) => review["spotId"] === +spotId
  );
  // console.log(specificReviews);

  useEffect(() => {
    dispatch(getSpots());
    dispatch(getReviews());
  }, [dispatch]);

  if (!spot) return <Redirect to="/" />;

  return (
    <>
      <ul>
        {spot.map((spot) => (
          <li>{spot.name}</li>
        ))}
      </ul>

      <ul>
        {specificReviews.map((review) => (
          <li>{review.review}</li>
        ))}
      </ul>

      <ReviewFormContainer />
    </>
  );
}
