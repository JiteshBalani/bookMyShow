import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getMovieById } from '../../api/movies';
import { Input, message, Spin, Space, Button } from 'antd';
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
            <img src={movie.poster} width={150} alt="Movie Poster" />
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
            <h2 style={{fontWeight: 500}}>About this movie</h2>
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
                <div className="showtimes-section">
                  <h2 style={{fontWeight: 500}}>Available Showtimes</h2>
                  {shows.map((theatre) => (
                    <div key={theatre._id} className="theatre-card">
                      <Space size="middle" wrap>
                        <h4>{theatre.name}:</h4>
                        <p>{theatre.address}</p>
                      </Space>
                      {theatre.shows.length > 0 ? (
                        <div className="show-details">
                          <Space size="middle" wrap>
                            {theatre.shows.map((show) => (
                              <Button
                                key={show._id}
                                onClick={() => navigate(`/book/${show._id}`)}
                                color="purple" variant="filled"                              >
                                <Space direction="vertical" size={0} align="center">
                                  <span>{show.time}</span>
                                  <span>₹{show.ticketPrice}</span>
                                </Space>
                              </Button>
                            ))}
                          </Space>
                          <br/>
                          <hr/>
                        </div>
                      ) : (
                        <p>No shows available.</p>
                      )}
                    </div>
                  ))}
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