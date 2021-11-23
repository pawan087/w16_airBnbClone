import styles from "../../components/Spot/ReserveFormContainer.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import BookingConfirmationModal from "../BookingConfirmationModal/index";
import { getBookings } from "../../store/bookings";
import { getSearch2 } from "../../store/search.js";

export default function ReserveFormComponent({ spot, bool2 }) {
  const dispatch = useDispatch();
  const searchCriteria = useSelector((state) => state.search);

  let searchedStartDate = searchCriteria?.startDate;
  let searchedEndDate = searchCriteria?.endDate;

  if (searchCriteria.startDate)
    searchedStartDate = searchedStartDate.toISOString().split("T")[0];

  if (searchCriteria.endDate)
    searchedEndDate = searchedEndDate.toISOString().split("T")[0];

  const [startDate, setStartDate] = useState(searchedStartDate || "");
  const [endDate, setEndDate] = useState(searchedEndDate || "");

  const x = new Date(startDate).getTime();
  const y = new Date(endDate).getTime();

  let today = new Date();
  let tomorrow = new Date();
  let bool = false;
  let dayCount = false;

  if (y > x) {
    dayCount = (y - x) / 60 / 60 / 1000 / 24;
  }

  let price;
  let total;

  price = spot[0]?.price;

  if (typeof dayCount == "number") {
    total = price * dayCount;
  }

  tomorrow.setDate(today.getDate() + 1);
  today = today.toISOString().split("T")[0];
  tomorrow = tomorrow.toISOString().split("T")[0];

  useEffect(() => {
    dispatch(getBookings());
  }, [dispatch, startDate, endDate]);

  const setSDate = (sd) => {
    setStartDate(sd);

    setEndDate(endDate);

    dispatch(getSearch2({ startDate: sd, endDate: endDate }));

    return bool;
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
            defaultValue="1"
            min="1"
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
          bool3={bool2}
        />
      </div>

      {true && (
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
            {!!dayCount && (
              <div className={styles.detail}>Special discount</div>
            )}

            {!!dayCount && (
              <div className={styles.detailTotal}>
                -${(total * 0.02).toFixed(2)}
              </div>
            )}
          </div>

          <div className={styles.detailContainer}>
            {!!dayCount && <div className={styles.detail}>Cleaning fee</div>}

            {!!dayCount && (
              <div className={styles.detailTotal}>
                ${(total * 0.15).toFixed(2)}
              </div>
            )}
          </div>

          <div className={styles.detailContainer}>
            {!!dayCount && <div className={styles.detail}>Service fee</div>}

            {!!dayCount && (
              <div className={styles.detailTotal}>
                ${(total * 0.12).toFixed(2)}
              </div>
            )}
          </div>

          {!bool2 && (
            <div className={styles.detailContainer}>
              {!!dayCount && (
                <div className={styles.detail}>Occupancy taxes and fees</div>
              )}

              {!!dayCount && (
                <div className={styles.detailTotal}>
                  ${(total * 0.06).toFixed()}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <div className={styles.divisorContainer}>
        {!!dayCount && <p className={styles.divisor}></p>}
        <div className={styles.footer}>
          {!!dayCount && <div className={styles.footerDetail}>Total</div>}

          {!!dayCount && (
            <div className={styles.footerDetail}>
              $
              {(
                total -
                total * 0.02 +
                total * 0.15 +
                total * 0.12 +
                total * 0.06
              ).toFixed(2)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
