import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect, Route } from "react-router-dom";
import { getBookings } from "../../store/bookings";
import { getSpots } from "../../store/spots";

export default function BookingsContainer() {
  const dispatch = useDispatch();
  const session = useSelector((state) => state.session);
  const bookings = useSelector((state) => state.booking);
  const spots = useSelector((state) => state.spot);
  const spotsArr = Object.values(spots);
  const bookingArr = Object.values(bookings);

  // console.log(bookings[5].Spot.name);

  useEffect(() => {
    dispatch(getBookings());
    dispatch(getSpots());
  }, [dispatch]);

  if (!session.user) return <Redirect to="/" />;

  const userId = session.user.id;

  const userBookings = bookingArr.filter(
    (booking) => booking.userId === userId
  );

  return (
    <ul>
      {userBookings.map((booking) => (
        <li>{booking.Spot.name}</li>
      ))}
      {userBookings.map((booking) => (
        <li>{booking.startDate}</li>
      ))}
    </ul>
  );
}
