import styles from "../../components/TestSpot/ReserveFormContainer.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

import BookingConfirmationModal from "../BookingConfirmationModal/index";
import { getBookings } from "../../store/bookings";
import { getSearch2 } from "../../store/search.js";

export default function ReserveFormComponent({ spot }) {
  const dispatch = useDispatch();
  const { spotId } = useParams();

  const searchCriteria = useSelector((state) => state.search);
  const user = useSelector((state) => state.session.user);
  const bookings = useSelector((state) => state.booking);

  let searchedStartDate = searchCriteria.startDate;
  let searchedEndDate = searchCriteria.endDate;

  if (searchCriteria.startDate)
    searchedStartDate = searchedStartDate.toISOString().split("T")[0];
  if (searchCriteria.endDate)
    searchedEndDate = searchedEndDate.toISOString().split("T")[0];

  const [startDate, setStartDate] = useState(searchedStartDate);
  const [endDate, setEndDate] = useState(searchedEndDate);
  const x = new Date(startDate).getTime();
  const y = new Date(endDate).getTime();
  let today = new Date();
  let tomorrow = new Date();
  let bool = false;
  let dayCount = false;
  const bookingsArr = Object.values(bookings);

  if (y > x) {
    dayCount = (y - x) / 60 / 60 / 1000 / 24;
  }

  let price;
  let total;

  if (spot[0]) {
    price = spot[0].price;
    if (typeof dayCount == "number") total = price * dayCount;
  }

  tomorrow.setDate(today.getDate() + 1);
  today = today.toISOString().split("T")[0];
  tomorrow = tomorrow.toISOString().split("T")[0];

  const specificBookings = bookingsArr.filter((b) => {
    return b["spotId"] === +spotId;
  });

  if (user === undefined) {
    bool = false;
  } else {
    if (specificBookings.length === 0) {
      bool = true;
    } else {
      specificBookings.forEach((booking) => {
        if (startDate < endDate) {
          if (booking.startDate < startDate && endDate < booking.endDate) {
            bool = false;
            return;
          }

          if (
            startDate < booking.startDate &&
            booking.startDate < endDate &&
            endDate < booking.endDate
          ) {
            bool = false;
            return;
          }

          if (startDate < booking.startDate && booking.endDate < endDate) {
            bool = false;
            return;
          }

          if (
            booking.startDate < startDate &&
            booking.endDate < endDate &&
            startDate < booking.endDate
          ) {
            bool = false;
            return;
          }

          bool = true;
        }
      });
    }
  }

  useEffect(() => {
    dispatch(getBookings());
  }, [dispatch]);

  const setSDate = (sd) => {
    setStartDate(sd);

    setEndDate(endDate);

    dispatch(getSearch2({ startDate: sd, endDate: endDate }));
  };

  const setEDate = (ed) => {
    setEndDate(ed);

    setStartDate(startDate);

    dispatch(getSearch2({ startDate: startDate, endDate: ed }));
  };

  return (
    <div className={styles.outerContainer}>
      <div className={styles.header}>
        ${price}
        <span className={styles.perNight}>/night</span>
      </div>

      <div className={styles.inputsContainer}>
        <div className={styles.datesInputContainer}>
          <div className={styles.inputContainer}>
            <label className={styles.label}>Check-In</label>

            <input
              min={tomorrow}
              value={startDate}
              onChange={(e) => setSDate(e.target.value)}
              className={styles.dateInput}
              type="date"
            ></input>
          </div>

          <div className={styles.inputContainer}>
            <label className={styles.label}>Check-Out</label>

            <input
              min={tomorrow}
              value={endDate}
              onChange={(e) => setEDate(e.target.value)}
              className={styles.dateInput}
              type="date"
            ></input>
          </div>
        </div>

        <div className={styles.guestInputContainer}>
          <label className={styles.guestLabel}>Guests</label>

          <input
            defaultValue="0"
            min="0"
            className={styles.guestInput}
            type="number"
          ></input>
        </div>
      </div>

      <div className={styles.btnContainer}>
        <BookingConfirmationModal
          total={total}
          spot={spot}
          startDate={startDate}
          endDate={endDate}
        />
      </div>

      <div className={styles.detailsContainer}>
        <div className={styles.detailContainer}>
          {!!dayCount && bool === true && (
            <div className={styles.detail}>
              ${price} x {dayCount} nights
            </div>
          )}

          {!!dayCount && bool === true && (
            <div className={styles.detailTotal}>${total}</div>
          )}
        </div>

        <div className={styles.detailContainer}>
          {!!dayCount && bool === true && (
            <div className={styles.detail}>Special discount</div>
          )}

          {!!dayCount && bool === true && (
            <div className={styles.detailTotal}>-${total * 0.02}</div>
          )}
        </div>

        <div className={styles.detailContainer}>
          {!!dayCount && bool === true && (
            <div className={styles.detail}>Cleaning fee</div>
          )}

          {!!dayCount && bool === true && (
            <div className={styles.detailTotal}>${total * 0.15}</div>
          )}
        </div>

        <div className={styles.detailContainer}>
          {!!dayCount && bool === true && (
            <div className={styles.detail}>Service fee</div>
          )}

          {!!dayCount && bool === true && (
            <div className={styles.detailTotal}>${total * 0.12}</div>
          )}
        </div>

        <div className={styles.detailContainer}>
          {!!dayCount && bool === true && (
            <div className={styles.detail}>Occupancy taxes and fees</div>
          )}

          {!!dayCount && bool === true && (
            <div className={styles.detailTotal}>${total * 0.06}</div>
          )}
        </div>
      </div>

      <div className={styles.divisorContainer}>
        {!!dayCount && bool === true && <p className={styles.divisor}></p>}
        <div className={styles.footer}>
          {!!dayCount && bool === true && (
            <div className={styles.footerDetail}>Total</div>
          )}

          {!!dayCount && bool === true && (
            <div className={styles.footerDetail}>
              $
              {total -
                total * 0.02 +
                total * 0.15 +
                total * 0.12 +
                total * 0.06}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
