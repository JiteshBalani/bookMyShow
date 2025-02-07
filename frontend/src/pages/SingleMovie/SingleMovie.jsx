import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getMovieById } from '../../api/movies';
import { getAllTheatres } from '../../api/theatres';
import { Input, message, Spin } from 'antd';
import moment from 'moment';
import { CalendarOutlined } from "@ant-design/icons";

const SingleMovie = () => {

  const [movie, setMovie] = useState([]);
  const [theatres, setTheatres] = useState([]);
  const [loadingInfo, setLoadingInfo] = useState(false);
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  const [theatresInfo, setTheatresInfo] = useState(false);

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

  const getTheatres = async () => {
    try {
      setTheatresInfo(true);
      const response = await getAllTheatres();
      if (response.success) {
        setTheatres(response.data);
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
    navigate(`/movie/${params.id}>date=${e.target.value}`);
  };

  useEffect(() => {
    getMovieData();
  }, []);

  useEffect(() => {
    getTheatres();
  }, [date])

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
            <p className="movie-data">
              Language: <span>{movie.language}</span>
            </p>
            <p className="movie-data">
              Genre: <span>{movie.genre}</span>
            </p>
            <p className="movie-data">
              Release Date:{" "}
              <span>{moment(movie.date).format("MMM Do YYYY")}</span>
            </p>
            <p className="movie-data">
              Duration: <span>{movie.duration} Minutes</span>
            </p>
            <hr />
            <h2>About this movie</h2>
            <p className="movie-data">
              <span>{movie.description}</span>
            </p>
            <br />
            <hr />


            <div className="d-flex flex-column-mob align-items-center mt-3">
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
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SingleMovie