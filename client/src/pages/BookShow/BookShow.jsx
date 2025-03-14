import { useEffect, useState } from "react";
import { getShowById } from "../../api/shows";
import { useNavigate, useParams } from "react-router-dom";
import { message, Card, Row, Col, Button, Flex, Modal } from "antd";
import moment from "moment";
import { bookShow, makePayment } from "../../api/bookings";
import StripeCheckout from 'react-stripe-checkout';
import { useDispatch } from "react-redux";
import { setLoading } from "../../app/loaderSlice";
import Loader from "../../components/Loader";

const BookShow = () => {
  const [show, setShow] = useState();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stripePubKey = "pk_test_51QrRzlKtEtLLKH9OAKMUitZI4Y3L7jzL5T8LVpQ8KmCNnhNM6vB46IXiGMsOkJYjZyWY7MgAeITzpRMAon4ggOAB00vd4fHedn";

  const getData = async () => {
    try {
      dispatch(setLoading(true));
      const response = await getShowById({ showId: params.id });
      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (response.success) {
        setShow(response.data);
        // message.success(response.message);
        console.log(response.data);
      } else {
        message.error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const getSeats = () => {
    const columns = 12;
    const totalSeats = show.totalSeats || 120;
    const rows = Math.ceil(totalSeats / columns);

    return (
      <div className="d-flex flex-column align-items-center">
        <Loader />
        <div className="w-100 max-width-600 mx-auto mb-25px">
          <p className="text-center mb-10px">
            Screen this side, you will be watching in this direction
          </p>
          <div className="screen-div"></div>
        </div>
        <Flex justify='center' align='center'>
          <ul className="seat-ul justify-content-center">
            {Array.from(Array(rows).keys()).map((row) => {
              return Array.from(Array(columns).keys()).map((column) => {
                let seatNumber = row * columns + column + 1;

                // Calculation for the first iteration
                // 0*12 + 0+1 = 1
                // 0*12 + 1+1 = 2
                // 0*12 + 2+1 = 3
                // So on up till 12th seat

                // Calculation for the second iteration
                // 1*12 + 0+1 = 13
                // 1*12 + 1+1 = 14
                // 1*12 + 2+1 = 15
                // So on up till 24th seat

                // Calculation for the third iteration
                // 2*12 + 0+1 = 25
                // 2*12 + 1+1 = 26
                // 2*12 + 2+1 = 27
                // So on up till 36th seat

                // So on...

                // this part

                let seatClass = "seat-btn";

                if (selectedSeats.includes(seatNumber)) {
                  seatClass += " selected";
                }
                if (show.bookedSeats.includes(seatNumber)) {
                  seatClass += " booked";
                }

                if (seatNumber <= totalSeats)
                  return (
                    <li key={seatNumber}>
                      <button
                        className={seatClass}
                        onClick={() => {
                          if (selectedSeats.includes(seatNumber)) {
                            setSelectedSeats(
                              selectedSeats.filter(
                                (curSeatNumber) => curSeatNumber !== seatNumber
                              )
                            );
                          } else {
                            setSelectedSeats([...selectedSeats, seatNumber]);
                          }
                        }}
                      >
                        {seatNumber}
                      </button>
                    </li>
                  );
              });
            })}
          </ul>
        </Flex>

        <div className="d-flex bottom-card justify-content-between w-100 max-width-600 mx-auto mb-25px mt-3">
          <div className="flex-1">
            Selected Seats: <span>{selectedSeats.join(", ")}</span>
          </div>
          <div className="flex-shrink-0 ms-3">
            Total Price:{" "}
            <span>Rs. {selectedSeats.length * show.ticketPrice}</span>
          </div>
        </div>
      </div>
    );
  };

  const book = async (transactionId) => {
    try {
      const response = await bookShow({ show: params.id, transactionId, seats: selectedSeats });
      if (response.success) {
        message.success("Show Booking done!");
        navigate("/profile");
      } else {
        message.error(response.message);
      }
    } catch (err) {
      message.error(err.message)
    }
  };

  const onToken = async (token) => {
    try {
      const response = await makePayment(token, selectedSeats.length * show.ticketPrice * 100);
      if (response.success) {
        message.success(response.message);
        book(response.data)
        // console.log(response);
      } else {
        message.error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  }

  const creditCardInfo = (openStripeCheckout) => {
    Modal.info({
      title: "Use this dummy data to test the stripe payments.",
      content: (
        <div>
          <p><strong>Card Number:</strong> 4242 4242 4242 4242</p>
          <p><strong>Expiry:</strong> Any future date</p>
          <p><strong>CVC:</strong> Any 3-digit number</p>
        </div>
      ),

      onOk() {
        openStripeCheckout(); // Call Stripe after user acknowledges the modal
      },
    });
  };

  // const onToken=(token)=>{
  //  console.log(token)
  // }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {show && (
        <Row gutter={24}>
          <Col span={24}>
            <Card
              title={
                <div className="movie-title-details">
                  <h1>{show.movie.title}</h1>
                  <p>
                    Theatre: {show.theatre.name}, {show.theatre.address}
                  </p>
                </div>
              }
              extra={
                <div className="show-name py-3">
                  <h3>
                    <span>Show Type:</span> {show.name}
                  </h3>
                  <h3>
                    <span>Date & Time: </span>
                    {moment(show.date).format("MMM Do YYYY")} at{" "}
                    {show.time}
                  </h3>
                  <h3>
                    <span>Ticket Price:</span> Rs. {show.ticketPrice}/-
                  </h3>
                  <h3>
                    <span>Total Seats:</span> {show.totalSeats}
                    <span> &nbsp;|&nbsp; Available Seats:</span>{" "}
                    {show.totalSeats - show.bookedSeats.length}{" "}
                  </h3>
                </div>
              }
              style={{ width: "100%" }}
            >
              {getSeats()}
              {selectedSeats.length > 0 && (
                <>
                  <StripeCheckout
                    token={onToken}
                    billingAddress
                    amount={selectedSeats.length * show.ticketPrice * 100}
                    stripeKey={stripePubKey}
                    triggerEvent="manual"
                    ref={(ref) => (window.stripeRef = ref)}
                    style={{display: "none"}} // Store reference for manual trigger
                  />
                  <div className="max-width-600 mx-auto">
                    <Button
                      type="primary"
                      shape="round"
                      size="large"
                      block
                      onClick={() => creditCardInfo(() => window.stripeRef?.onClick())}
                    >
                      Pay Now
                    </Button>
                  </div>
                </>
              )}
            </Card>
          </Col>
        </Row>
      )}
    </>
  )
}

export default BookShow