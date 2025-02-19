import { Button, Card, Col, Flex, Row, message } from "antd";
import { useEffect, useState } from "react";
import { getAllBookings } from "../../api/bookings";
import moment from 'moment';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoading } from "../../app/loaderSlice";
import Loader from "../../components/Loader";

const Profile = () => {
  const [bookings, setBookings] = useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(setLoading(true));
      const response = await getAllBookings();
      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (response.success) {
        setBookings(response.data);
        console.log(response.data);
      } else {
        message.error(response.message);
      }

    } catch (err) {
      message.error(err.message);
    } finally {
      dispatch(setLoading(false));
    }
  }

  useEffect(() => {
    getData();
  }, []);


  return (
    <div style={{minHeight: '100vh'}}>
    <Loader/>
      <h1>Bookings </h1>
      {bookings && <Row gutter={24}>
        {bookings.sort((a, b) => {
    const dateDiff = new Date(b.show.date) - new Date(a.show.date); // Compare dates (latest first)
    
    if (dateDiff !== 0) return dateDiff; // If dates are different, sort by date

    // If dates are the same, sort by time (latest first)
    return moment(b.show.time, "hh:mm A").diff(moment(a.show.time, "hh:mm A"));
  })
        .map(booking => {
          return <Col key={booking._id} xs={{ span: 24 }} lg={{ span: 12 }}>
            <Card className="mb-3">
              <div className="d-flex flex-column-mob">
                <Flex gap='small' className="flex-column-mob" align="center">

                  <div className="show-details flex-1" style={{ padding: "10px" }}>
                    <h2 className="mt-0 mb-0">{booking.show.movie.title}</h2>
                    <hr/>
                    <Flex gap='small' vertical><p>Theatre: <b>{booking.show.theatre.name}</b></p>
                      <p>Seat(s) no.: <b>{booking.seats.join(", ")}</b></p>
                      <p>Date & Time: <b>{moment(booking.show.date).format("MMM Do YYYY")},  {booking.show.time}</b>  </p>
                      <p>Amount: <b>₹ {booking.show.bookedSeats.length * booking.show.ticketPrice}/- </b></p>
                      <p style={{overflow:'hidden'}}>Booking ID: <b>{booking.transactionId} </b></p>
                    </Flex>

                  </div>
                  <div ><img src={booking.show.movie.poster} width={150} alt="Movie Poster" /></div>
                </Flex>
              </div>
            </Card>
          </Col>
        })}

      </Row>}

      {!bookings.length && <div className="text-center pt-3">
        <h1>You've not booked any show yet!</h1>
        <Link to="/"><Button type="primary">Start Booking</Button></Link>
      </div>}

    </div>
  )
}

export default Profile