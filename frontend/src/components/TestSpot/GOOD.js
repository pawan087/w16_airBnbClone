import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect, Route } from "react-router-dom";
import { getImages } from "../../store/images";
import { getReviews } from "../../store/reviews";
import { getSpots } from "../../store/spots";
import ReviewFormContainer from "./ReviewFormContainer";
import styles from "../../components/TestSearch/SearchContainer.module.css";
export default function SpotsContainer() {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spot);
  const images = useSelector((state) => state.images);
  const reviews = useSelector((state) => state.review);
  const spotsArr = Object.values(spots);
  const reviewsArr = Object.values(reviews);
  const spot = spotsArr.filter((spot) => spot["id"] === +spotId);
  const specificReviews = reviewsArr.filter(
    (review) => review["spotId"] === +spotId
  );
  const imagesArr = Object.values(images);
  const specificImages = imagesArr.filter((image) => image.spotId === +spotId);
  let showSpot = false;
  if (spot[0]) {
    showSpot = true;
  }

  // const image = specificImages[0].url;

  useEffect(() => {
    dispatch(getSpots());
    dispatch(getReviews());
    dispatch(getImages());
  }, [dispatch]);

  if (!spot) return <Redirect to="/" />;

  /*   <ul>
    {specificReviews.map((review) => (
      <li>{review.review}</li>
    ))}
  </ul> */

  return (
    <>
      {showSpot && <h3>{spot[0].name}</h3>}
      <ReviewFormContainer />
    </>
  );
}
