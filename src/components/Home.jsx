import axios from 'axios'
import { useEffect, useState } from 'react';
import Search from './Search';
import Footer from './Footer';

const apiKey = import.meta.env.VITE_API_KEY;
const apiTrend = import.meta.env.VITE_API_TREND;
const apiTop = import.meta.env.VITE_API_TOP20;
const apiReleases = import.meta.env.VITE_API_RELEASES;
const imgURL = import.meta.env.VITE_API_IMG;

function Home(){
  const [topMovies,setTopMovies] = useState();
  const [trendMovies,setTrendMovies] = useState();
  const [nextMovies,setNextMovies] = useState();
  const [loading, setLoading] = useState(true);

  const params = {
    "api_key" : apiKey,
    "language" : "pt-BR", 
  }

  useEffect(()=>{
    const axiosMovies = async () => {
      try {
        const trendMovies = await axios.get(apiTrend, { params : params });
        const topMovies = await axios.get(apiTop, { params : params });
        const nextMovies = await axios.get(apiReleases, { params : params });
        const currentYear = new Date().getFullYear();
  
        setTopMovies(topMovies.data.results.slice(0,20))
        setTrendMovies(trendMovies.data.results)
  
        setNextMovies(nextMovies.data.results.filter(movie => {
            return new Date(movie.release_date).getFullYear() === currentYear;
        }));

        setLoading(false);
      } catch (error) {
          console.error('Error in search movies:', error);
          setLoading(false);
      }
    };

    axiosMovies();
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
            <a href={`/movie/${movie.id}`}>
              <img
                className="movie-image"
                src={`${imgURL}w200${movie.poster_path}`}
                alt={`Poster de ${movie.title}`}
                draggable="false"
              />
            </a>
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
            <a href={`/movie/${movie.id}`}>
              <img
                className="movie-image"
                src={`${imgURL}w200${movie.poster_path}`}
                alt={`Poster de ${movie.title}`}
                draggable="false"
              />
            </a>
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
            <a href={`/movie/${movie.id}`}>
              <img
                className="movie-image"
                src={`${imgURL}w200${movie.poster_path}`}
                alt={`Poster de ${movie.title}`}
                draggable="false"
              />
            </a>
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