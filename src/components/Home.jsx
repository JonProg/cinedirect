import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';

const imgURL = 'https://image.tmdb.org/t/p/';

function Home(){
  const [topMovies, setTopMovies] = useState([]);
  const [trendMovies, setTrendMovies] = useState([]);
  const [nextMovies, setNextMovies] = useState([]);
  const [popularSeries, setPopularSeries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const currentYear = new Date().getFullYear();

        const responses = await Promise.allSettled([
          axios.get('http://localhost:4000/api/trending'),
          axios.get('http://localhost:4000/api/top'),
          axios.get('http://localhost:4000/api/releases'),
          axios.get('http://localhost:4000/api/series/popular')
        ]);

        const [trend, top, releases, series] = responses;

        if (trend.status === 'fulfilled') {
          setTrendMovies(trend.value.data.results || []);
        }

        if (top.status === 'fulfilled') {
          setTopMovies(top.value.data.results?.slice(0, 20) || []);
        }

        if (series.status === 'fulfilled') {
          setPopularSeries(series.value.data.results || []);
        }

        if (releases.status === 'fulfilled') {
          setNextMovies(
            (releases.value.data.results || []).filter((movie) => {
              return [currentYear, currentYear - 1].includes(
                new Date(movie.release_date).getFullYear()
              );
            })
          );
        }

      } catch (error) {
        console.error(error);
      } finally {
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
            <Link to={`/players/${movie.media_type}/${movie.id}`}>
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
        <h2>| Séries Populares</h2>
      </header>

      <div className="wrapper">
        {popularSeries.map((serie) => (
          <div className="movie-item" key={serie.id}>
            <Link to={`/players/tv/${serie.id}`}>
              <img
                className="movie-image"
                src={`${imgURL}w200${serie.poster_path}`}
                alt={`Poster de ${serie.name}`}
                draggable="false"
                loading="lazy"
              />
            </Link>
            <p className="title-movie">
              {serie.name.length < 20
                ? serie.name
                : `${serie.name.slice(0, 17)}...`}
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
            <Link to={`/players/${movie.media_type}/${movie.id}`}>
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
            <Link to={`/players/${movie.media_type}/${movie.id}`}>
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
    </>
  );
}

export default Home;
