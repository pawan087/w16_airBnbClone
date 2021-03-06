import React, { useEffect, useState } from "react";
import { getSpots } from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { getImages } from "../../store/images";
import { delBooking } from "../../store/bookings";
import { getUserBookings } from "../../store/bookings";
import ReactLoading from "react-loading";

import styles from "../../components/BookingConfirmationModal/ConfirmationForm.module.css";

function ConfirmationForm({
  booking,
  startDate,
  endDate,
  name,
  username,
  setShowModal,
}) {
  const dispatch = useDispatch();

  const session = useSelector((state) => state.session);

  const [load, setLoad] = useState(false);

  const deleteBooking = async (e, b) => {
    e.preventDefault();

    setLoad(true);

    await dispatch(delBooking(b));

    await dispatch(getSpots());

    await dispatch(getImages());

    await dispatch(getUserBookings(session.user.id));

    setShowModal(false);
    setLoad(false);
  };

  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch]);

  return (
    <div className={styles.outerContainer}>
      {load && (
        <div className={styles.loaderCotnainer}>
          <ReactLoading
            type={"cylon"}
            color={"#009cd5"}
            height={"0px"}
            width={"57.5px"}
          />
        </div>
      )}

      <div className={styles.logoContainer}>
        <img
          src={
            "https://logos-world.net/wp-content/uploads/2020/07/Airbnb-Logo-2008-2014.png"
          }
          className={styles.logo}
          alt="bnbLogo"
        ></img>
      </div>

      <div className={styles.cardContainer}>
        <div className={styles.topCardContainer}>
          <div className={styles.title}>Reservation Cancellation</div>

          <div className={styles.subtitle}>{name}</div>
        </div>

        <div className={styles.middleContainer}>
          <div className={styles.middleHeader}>{username}'s Itinerary</div>

          <div className={styles.divisor}></div>

          <div className={styles.label}>Date(s)</div>

          <div className={styles.detail}>
            {startDate?.slice(5, 10)} through {endDate?.slice(5, 10)}
          </div>

          <div className={styles.label}></div>

          <div className={styles.detail}></div>

          <div className={styles.middleFooter}>
            Cancellations, as always, are always free but require a 24 hour
            notice.
          </div>
        </div>

        <div className={styles.btnsContainer}>
          <button
            onClick={() => setShowModal(false)}
            className={styles.btnCancel}
          >
            Go Back
          </button>

          <button
            onClick={(e) => deleteBooking(e, booking)}
            className={styles.btnSubmit}
          >
            Cancel Reservation
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationForm;
