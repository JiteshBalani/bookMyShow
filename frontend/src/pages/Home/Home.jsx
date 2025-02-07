import {useState, useEffect} from 'react';
import { message, Row, Col, Input } from 'antd';
import { useNavigate } from "react-router-dom";
import { getAllMovies } from "../../api/movies";
import { Spin } from 'antd';
import moment from "moment";

const Home = () => {

  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loadState, setLoadState] = useState(false);

  const getData = async () => {
    setLoadState(true);
    try {
      const response = await getAllMovies();
      if(response.success) {
        setMovies(response.data);
      } else {
        message.error(response.message);
      }

    } catch(error)   {
      console.log(error);
      message.error(error.message);

    } finally {
      setLoadState(false);
    }

  }

  useEffect(() => {
    getData();
  }, []);
  
  if(loadState) {
    <div><Spin/></div>
  }

  return (
    <div style={{fontFamily: "montserrat"}}>
      <h1 className='text-center mb-5'>Shows near you</h1>
      <Row
        className="justify-content-center"

        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
      >
        {movies && 
          movies.map((movie) => {
            return(
              <Col
                className="gutter-row mb-5"
                key={movie._id}
                span={{
                  xs: 24,
                  sm: 24,
                  md: 12,
                  lg: 10,
                }}
              >
                <div className="text-center">
                  <img
                    className="cursor-pointer"
                    src={movie?.poster}
                    alt={movie?.title}
                    width={200} height={300}
                    style={{ borderRadius: "8px" }}
                    onClick={() => {
                      navigate(
                        `/movie/${movie._id}?date=${moment().format(
                          "YYYY-MM-DD"
                        )}`
                      );
                    }}
                  />
                  <h3
                    className="cursor-pointer" style={{fontWeight: 700, fontSize: "16px"}}
                  >
                    {movie?.title}
                  </h3>
                  <h3
                    className="cursor-pointer" style={{fontWeight: 400 }}
                  >
                    {movie?.genre}
                  </h3>
                  <h3 className="cursor-pointer" style={{ fontWeight: 500 }}>
                  {moment.duration(movie?.duration, "minutes").hours()}h{" "}
                  {moment.duration(movie?.duration, "minutes").minutes()}m || {movie?.language}
                  </h3>


                </div>
              </Col>
            )
          })
        }
      </Row>
    </div>
  )
}

export default Home