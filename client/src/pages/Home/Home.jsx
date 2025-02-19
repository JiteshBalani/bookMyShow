import {useState, useEffect} from 'react';
import { message, Row, Col, Input, Badge, Flex, Alert } from 'antd';
import { useNavigate } from "react-router-dom";
import { getAllMovies } from "../../api/movies";
import { Spin } from 'antd';
import moment from "moment";
import { useDispatch } from 'react-redux';
import { setLoading } from '../../app/loaderSlice';
import Loader from '../../components/Loader';

const Home = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [movies, setMovies] = useState([]);

  const getData = async () => {
    dispatch(setLoading(true));
    try {
      const response = await getAllMovies();
      await new Promise((resolve) => setTimeout(resolve, 2000));
      if(response.success) {
        setMovies(response.data);
      } else {
        message.error(response.message);
      }

    } catch(error)   {
      console.log(error);
      message.error(error.message);

    } finally {
      dispatch(setLoading(false));
    }

  }

  useEffect(() => {
    getData();
  }, []);
  
  
  return (
    <div className='inner-container' style={{fontFamily: "montserrat", height:'100%'}}>
    <Loader/>
            <h1 className='text-center mb-5'>Shows near you</h1>
      <Row
        className="justify-content-center flex-1"

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
                className="gutter-row mb-5 mx-auto"
                key={movie._id}
                span={{
                  xs: 24,
                  sm: 24,
                  md: 12,
                  lg: 10,
                }}
              >
                <div className="text-center">
                <Badge.Ribbon 
                    text="Weekend Classic" 
                    color="blue" 
                    style={{ display: movie.weekendOnly ? "block" : "none" }}
                  >
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
                  </Badge.Ribbon>
                  <h3
                    className="cursor-pointer" style={{fontWeight: 700, fontSize: "16px", width:'200px'}}
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