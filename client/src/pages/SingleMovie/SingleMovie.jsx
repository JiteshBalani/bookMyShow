import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getMovieById } from '../../api/movies';
import { Input, message, Spin, Space, Button, Divider, Col, Row, Tooltip } from 'antd';
import moment from 'moment';
import { CalendarOutlined } from "@ant-design/icons";
import { allTheatresByMovie } from '../../api/shows';

const SingleMovie = () => {

  const [movie, setMovie] = useState([]);
  const [loadingInfo, setLoadingInfo] = useState(false);
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  const [theatresInfo, setTheatresInfo] = useState(false);
  const [shows, setShows] = useState([]);

  const navigate = useNavigate();
  const params = useParams();

  const getMovieData = async () => {
    try {
      setLoadingInfo(true);
      const response = await getMovieById(params.id);
      if (response.success) {
        setMovie(response.data);
        console.log(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoadingInfo(false);
    }
  };

  const getShows = async () => {
    try {
      setTheatresInfo(true);
      const response = await allTheatresByMovie(params.id, date);
      if (response.success) {
        setShows(response.data);
        console.log(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    } finally {
      setTheatresInfo(false);
    }
  }

  const handleDate = (e) => {
    setDate(moment(e.target.value).format("YYYY-MM-DD"));
    navigate(`/movie/${params.id}?date=${e.target.value}`);
  };

  useEffect(() => {
    getMovieData();
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const selectedDate = queryParams.get("date") || moment().format("YYYY-MM-DD");
    setDate(selectedDate);
    getShows();
  }, [date]);

  if (loadingInfo === true) { <Spin /> }
  return (
    <div className='inner-container' style={{ fontFamily: "montserrat" }}>
      {movie && (
        <div className="d-flex single-movie-div">
          <div className="flex-Shrink-0 me-3 single-movie-img">
            <img src={movie.bannerPoster} alt="Movie Poster"
              style={{ width: "100%", height: "60vh" }} />
          </div>
          <div className="w-100">
            <h1 className="mt-0">{movie.title}</h1>

            <Space direction='horizontal' size="middle" align='center'>
              <p className="movie-data">
                Release Date:{" "}
                <span>{moment(movie.date).format("MMM DD YYYY")}</span>
              </p>
              <p className="movie-data">
                Language: <span>{movie.language}</span>
              </p>
              <p className="movie-data">
                Genre: <span>{movie.genre}</span>
              </p>

              <p className="movie-data">
                Duration: <span>{movie.duration} Minutes</span>
              </p>


            </Space>
            <hr />
            <h2 style={{ fontWeight: 500 }}>About this movie</h2>
            <p className="movie-data">
              <span>{movie.description}</span>
            </p>
            <br />
            <hr />


            <div className="d-flex flex-column-mob align-items-center mt-3">
              <Space direction="horizontal" size={0} align="center">
                <label className="me-3 flex-shrink-0" style={{ fontSize: "16px" }}>Choose the date:</label>
                <Input
                  onChange={handleDate}
                  type="date"
                  min={moment().format("YYYY-MM-DD")}
                  className="max-width-300 mt-8px-mob"
                  value={date}
                  placeholder="default size"
                  prefix={<CalendarOutlined />}
                />
              </Space>
            </div>
            <br />

            <div className="d-flex flex-column-mob align-items-center mt-3">
              {shows.length > 0 ? (
                <div className="theatre-wrapper mt-3 pt-3">
                  <h2>Available Showtimes</h2>
                  {shows.map((theatre) => {
                    return (
                      <div key={theatre._id}>
                        <Row gutter={24} key={theatre._id}>
                          <Col xs={{ span: 24 }} lg={{ span: 8 }}>
                            <h3>{theatre.name}</h3>
                            <p>{theatre.address}</p>
                          </Col>
                          <Col xs={{ span: 24 }} lg={{ span: 16 }}>
                            <ul className="show-ul">
                              {theatre.shows
                                .sort((a, b) => {
                                  const timeA = moment(a.time, "hh:mm A");
                                  const timeB = moment(b.time, "hh:mm A");
                                  return timeA.diff(timeB);
                                })
                                .map((singleShow) => {
                                  const showDateTime = moment(`${date} ${singleShow.time}`, "YYYY-MM-DD hh:mm A");
                                  const cutoffTime = showDateTime.subtract(15, "minutes");
                                  const isBookingClosed = moment().isAfter(cutoffTime);

                                  const availableSeats = singleShow.totalSeats - singleShow.bookedSeats.length;
                                  const tooltipMessage = isBookingClosed
                                    ? "Bookings closed for this show. Select the next available show."
                                    : `Available seats: ${availableSeats}`;

                                  return (
                                    <Tooltip key={singleShow._id} title={tooltipMessage} color={isBookingClosed ? "red" : "#27667B"}>
                                      <li
                                        style={{
                                          // pointerEvents: isBookingClosed ? "none" : "auto",
                                          color: isBookingClosed ? "gray" : "green",
                                          cursor: isBookingClosed ? "not-allowed" : "pointer"
                                        }}
                                        onClick={!isBookingClosed ? () => navigate(`/book-show/${singleShow._id}`) : null}
                                      >
                                        {singleShow.time}
                                      </li>
                                    </Tooltip>
                                  );
                                })}
                            </ul>
                          </Col>
                        </Row>
                        <Divider />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p>No shows available for the selected date.</p>
              )}
            </div>

          </div>
        </div>
      )}
    </div>
  )
}

export default SingleMovie