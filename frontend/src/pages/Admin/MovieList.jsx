import {useState, useEffect} from 'react'
import { getAllMovies } from '../../api/movies';
import { Button, Input, Table } from 'antd';
import MovieForm from './MovieForm';
import MovieInfo from './MovieInfo';
import {SearchOutlined} from '@ant-design/icons';

const MovieList = () => {

    const[movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [movieInfoOpen, setMovieInfoOpen] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const getData = async () => {
        try{
          const response = await getAllMovies();
          const allMovies = response?.data || [];
          setMovies(allMovies);
          setFilteredMovies(allMovies);
        } catch(error){
          setError(error);
          console.log("Failed to fetch the movies", error);
        } finally{
          setLoading(false);
        }
    }

    const handleSearch = (e) => {
      const search =  e.target.value.toLowerCase();
      setSearchQuery(search);

      if(search.trim() === '') setFilteredMovies(movies);
      else {
        const filtered = movies.filter((movie) =>
          movie.title.toLowerCase().includes(search)
        );
        setFilteredMovies(filtered)
      }
    };

    const onMovieUpdate = async() => {
      await getData();
    }

    useEffect(()=>{
        getData();
    }, []);

    const tableHeadings = [
      {
        title: 'Poster',
        dataIndex : 'poster',
        render: (text, data) => {
          return <img src={data.poster} width = "75" height = "115" alt={data.title} style={{objectFit: "cover", display: "block"}}/>
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
    <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '16px'
            }}>
                <Input 
                    size="small" 
                    placeholder='Search a movie' 
                    suffix={<SearchOutlined />}
                    style={{
                        fontWeight: 300, 
                        fontSize: "1rem",
                        width: '250px'  // Fixed width for search bar
                    }}
                    onChange={handleSearch}
                    value={searchQuery}
                />
                <Button type='primary' style={{fontWeight:600}} 
                  onClick={() => {
                    setModalOpen(true);
                }}>
                    Add Movie
                </Button>
                
            </div>

    {/* add movie modal */}
    { modalOpen && <MovieForm modalOpen={modalOpen} setModalOpen={setModalOpen} onMovieUpdate={onMovieUpdate} /> }

    <Table columns={tableHeadings} 
            loading={loading} 
            dataSource={filteredMovies}
            rowKey="_id"
            className='cursor-pointer'
            onRow={(record) => ({
              onClick: () => {
                setSelectedMovie(record);
                setMovieInfoOpen(true);
              }
            })}
    />
    {/* update movie modal */}
    { movieInfoOpen && <MovieInfo 
      movieInfoOpen={movieInfoOpen} 
      setMovieInfoOpen={setMovieInfoOpen} 
      selectedMovie={selectedMovie} 
      onMovieUpdate={onMovieUpdate} /> }

  </>
  )
}

export default MovieList