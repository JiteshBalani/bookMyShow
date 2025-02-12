import { useEffect, useState } from "react";
import { getShowById } from "../../api/shows";
import { useNavigate, useParams } from "react-router-dom";
import { message, Card, Row, Col, Button } from "antd";
import moment from "moment";
import { bookShow, makePayment } from "../../api/bookings";
import StripeCheckout from 'react-stripe-checkout';

const BookShow = () => {
  const [show, setShow] = useState();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  const getSeats = () => {
    const columns = 12;
    const totalSeats = show.totalSeats || 120;
    const rows = Math.ceil(totalSeats / columns);
  }

  return (
    <div>BookShow</div>
  )
}

export default BookShow