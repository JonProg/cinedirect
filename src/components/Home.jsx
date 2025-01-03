import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';
import Footer from './Footer';

const imgURL = 'https://image.tmdb.org/t/p/';

function Home(){
  const [topMovies, setTopMovies] = useState();
  const [trendMovies, setTrendMovies] = useState();
  const [nextMovies, setNextMovies] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const trendResponse = await axios.get('http://127.0.0.1:4000/api/trending');
        const topResponse = await axios.get('http://127.0.0.1:4000/api/top');
        const nextResponse = await axios.get('http://127.0.0.1:4000/api/releases');
        const currentYear = new Date().getFullYear();

        setTopMovies(topResponse.data.results.slice(0, 20));
        setTrendMovies(trendResponse.data.results);

        setNextMovies(nextResponse.data.results.filter((movie) => {
          return  [currentYear, currentYear - 1].includes(new Date(movie.release_date).getFullYear());
        }));

        setLoading(false);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      <Search />
      <header>
        <h2>| Destaques</h2>
      </header>
      <div className="wrapper">
        {trendMovies.map((movie) => (
          <div className="movie-item" key={movie.id}>
            <Link to={`/movie/${movie.id}`}>
              <img
                className="movie-image"
                src={`${imgURL}w200${movie.poster_path}`}
                alt={`Poster de ${movie.title}`}
                draggable="false"
                loading='lazy'
              />
            </Link>
            <p className="title-movie">
              {movie.title.length < 20 ? movie.title : `${movie.title.slice(0, 17)}...`}
            </p>
          </div>
        ))}
      </div>

      <header>
        <h2>| TOP 20</h2>
      </header>
      <div className="wrapper">
        {topMovies.map((movie) => (
          <div className="movie-item" key={movie.id}>
            <Link to={`/movie/${movie.id}`}>
              <img
                className="movie-image"
                src={`${imgURL}w200${movie.poster_path}`}
                alt={`Poster de ${movie.title}`}
                draggable="false"
                loading='lazy'
              />
            </Link>
            <p className="title-movie">
              {movie.title.length < 20 ? movie.title : `${movie.title.slice(0, 17)}...`}
            </p>
          </div>
        ))}
      </div>
      
      <header>
        <h2>| Lançamentos</h2>
      </header>
      <div className="wrapper">
        {nextMovies.map((movie) => (
          <div className="movie-item" key={movie.id}>
            <Link to={`/movie/${movie.id}`}>
              <img
                className="movie-image"
                src={`${imgURL}w200${movie.poster_path}`}
                alt={`Poster de ${movie.title}`}
                draggable="false"
                loading='lazy'
              />
            </Link>
            <p className="title-movie">
              {movie.title.length < 20 ? movie.title : `${movie.title.slice(0, 17)}...`}
            </p>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}

export default Home;
