import styles from "../../components/TestSpot/ReserveFormContainer.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import BookingConfirmationModal from "../BookingConfirmationModal/index";
import { getBookings } from "../../store/bookings";
import { useParams } from "react-router";

export default function ReserveFormComponent({ spot }) {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const searchCriteria = useSelector((state) => state.search);
  let searchedStartDate = searchCriteria.startDate;
  let searchedEndDate = searchCriteria.endDate;
  if (searchCriteria.startDate)
    searchedStartDate = searchedStartDate.toISOString().split("T")[0];
  if (searchCriteria.endDate)
    searchedEndDate = searchedEndDate.toISOString().split("T")[0];

  const [startDate, setStartDate] = useState(searchedStartDate);
  const [endDate, setEndDate] = useState(searchedEndDate);

  const bookings = useSelector((state) => state.booking);
  const bookingsArr = Object.values(bookings);
  const specificBookings = bookingsArr.filter((b) => {
    return b["spotId"] === +spotId;
  });

  const x = new Date(startDate).getTime();
  const y = new Date(endDate).getTime();
  useEffect(() => {
    dispatch(getBookings());
  }, [dispatch]);
  const dayCount = (y - x) / 60 / 60 / 1000 / 24;
  let price;
  let total;
  if (spot[0]) {
    price = spot[0].price;
    if (typeof dayCount == "number") total = price * dayCount;
  }

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
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className={styles.dateInput}
              type="date"
            ></input>
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.label}>Check-Out</label>
            <input
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
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
          {!!dayCount && (
            <div className={styles.detail}>
              ${price} x {dayCount} nights
            </div>
          )}
          {!!dayCount && <div className={styles.detailTotal}>${total}</div>}
        </div>
        <div className={styles.detailContainer}>
          {!!dayCount && <div className={styles.detail}>Special discount</div>}
          {!!dayCount && (
            <div className={styles.detailTotal}>-${total * 0.025}</div>
          )}
        </div>
        <div className={styles.detailContainer}>
          {!!dayCount && <div className={styles.detail}>Cleaning fee</div>}
          {!!dayCount && (
            <div className={styles.detailTotal}>${total * 0.15}</div>
          )}
        </div>
        <div className={styles.detailContainer}>
          {!!dayCount && <div className={styles.detail}>Service fee</div>}
          {!!dayCount && (
            <div className={styles.detailTotal}>${total * 0.1}</div>
          )}
        </div>
        <div className={styles.detailContainer}>
          {!!dayCount && (
            <div className={styles.detail}>Occupancy taxes and fees</div>
          )}
          {!!dayCount && (
            <div className={styles.detailTotal}>${total * 0.0625}</div>
          )}
        </div>
      </div>
      <div className={styles.divisorContainer}>
        {!!dayCount && <p className={styles.divisor}></p>}
        <div className={styles.footer}>
          {!!dayCount && <div className={styles.footerDetail}>Total</div>}
          {!!dayCount && (
            <div className={styles.footerDetail}>
              $
              {total -
                total * 0.025 +
                total * 0.15 +
                total * 0.1 +
                total * 0.0625}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
