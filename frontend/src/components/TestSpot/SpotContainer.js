import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect, Route } from "react-router-dom";
import { getImages } from "../../store/images";
import { getReviews } from "../../store/reviews";
import { getSpots } from "../../store/spots";
import ReviewFormContainer from "./ReviewFormContainer";
import styles from "../../components/TestSpot/SpotContainer.module.css";
import ReserveFormComponent from "./ReserveFormComponent";
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
  let image;
  if (specificImages[0]) {
    image = specificImages[0].url;
  } else {
    image = "";
  }

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
      {showSpot && (
        <div className={styles.resultsContainer}>
          <div className={styles.cardContainer}>
            <div className={styles.imgContainer}>
              <img
                className={styles.img}
                layout="fill"
                objectFit="cover"
                src={image}
              />
            </div>

            <div className={styles.results}>
              <div className={styles.detailContainer}></div>

              <span className={styles.spotName}>{spot[0].name}</span>

              <div className={styles.divisor} />

              <p className={styles.detail}>
                {spot[0].address}, {spot[0].city}, {spot[0].country}
              </p>

              <div className={styles.priceDetail}>
                <div>
                  <p className={styles.price}>${spot[0].price}/night</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <ReserveFormComponent />
      <ReviewFormContainer />
    </>
  );
}
