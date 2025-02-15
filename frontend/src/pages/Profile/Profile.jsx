import { Button, Card, Col, Flex, Row, message } from "antd";
import { useEffect, useState } from "react";
import { getAllBookings } from "../../api/bookings";
import moment from 'moment';
import { Link } from "react-router-dom";

const Profile = () => {
  const [bookings, setBookings] = useState([]);

  const getData = async () => {
    try {
      const response = await getAllBookings();
      if (response.success) {
        setBookings(response.data);
        console.log(response.data);
      } else {
        message.error(response.message);
      }

    } catch (err) {
      message.error(err.message);
    }
  }

  useEffect(() => {
    getData();
  }, []);


  return (
    <div style={{minHeight: '100vh'}}>
      <h1>Bookings </h1>
      {bookings && <Row gutter={24}>
        {bookings.map(booking => {
          return <Col key={booking._id} xs={{ span: 24 }} lg={{ span: 12 }}>
            <Card className="mb-3">
              <div className="d-flex flex-column-mob">
                <Flex gap='small'>

                  <div className="show-details flex-1" style={{ padding: "10px" }}>
                    <h2 className="mt-0 mb-0">{booking.show.movie.title}</h2>
                    <hr/>
                    <Flex gap='small' vertical><p>Theatre: <b>{booking.show.theatre.name}</b></p>
                      <p>Seat(s) no.: <b>{booking.seats.join(", ")}</b></p>
                      <p>Date & Time: <b>{moment(booking.show.date).format("MMM Do YYYY")},  {moment(booking.show.time, "HH:mm").format("hh:mm A")}</b>  </p>
                      <p>Amount: <b>₹ {booking.show.bookedSeats.length * booking.show.ticketPrice}/- </b></p>
                      <p>Booking ID: <b>{booking.transactionId} </b></p>
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