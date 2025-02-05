import {useState, useEffect} from 'react'
import { getAllMovies } from '../../api/movies';
import { Button, Table } from 'antd';
import MovieForm from './MovieForm';

const MovieList = () => {

    const[movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const getData = async () => {
        try{
          const response = await getAllMovies();
          const allMovies = response?.data || [];
          setMovies(allMovies);
        } catch(error){
          setError(error);
          console.log("Failed to fetch the movies", error);
        } finally{
          setLoading(false);
        }
    }
    useEffect(()=>{
        getData();
    }, []);

    const tableHeadings = [
      {
        title: 'Poster',
        dataIndex : 'poster',
        render: (text, data) => {
          return <img src={data.poster} width = "75" height = "115" alt={data.title}/>
        }
      },
      {
        title: "Movie Name",
        dataIndex: "title",
      },
      {
        title: "Description",
        dataIndex: "description",
      },
      {
        title: "Duration",
        dataIndex: "duration",
      },
      {
        title: "Genre",
        dataIndex: "genre",
      },
      {
        title: "Language",
        dataIndex: "language",
      },
      {
        title: "Release Date",
        dataIndex: "releaseDate",
        render: (date) => {
          return new Date(date).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
          });
        }
      }
    ]

  return (
  <>
    <div className='d-flex justify-content-end'>
      <Button onClick={() => {
        setModalOpen(true);
      }}>
        Add Movie
      </Button>
    </div>

    {/* modal */}
    {modalOpen && <MovieForm modalOpen={modalOpen} setModalOpen={setModalOpen}/>}

    <Table columns={tableHeadings} 
    loading={loading} 
    dataSource={movies}
    rowKey="_id"
    />
  </>
  )
}

export default MovieList