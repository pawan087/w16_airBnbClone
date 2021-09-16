import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getSpots } from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../components/BookingConfirmationModal/ConfirmationForm.module.css";
import { delBooking } from "../../store/bookings";

function EditBookingForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  return null;
}

export default EditBookingForm;
