import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';

const imgURL = 'https://image.tmdb.org/t/p/';

function Row({ title, items, mediaTypeFallback }) {
  const rowRef = useRef(null);

  const scroll = (direction) => {
    if (!rowRef.current) return;
    const { clientWidth } = rowRef.current;
    rowRef.current.scrollBy({
      left: direction === 'left' ? -clientWidth * 0.8 : clientWidth * 0.8,
      behavior: 'smooth',
    });
  };

  if (!items || items.length === 0) return null;

  return (
    <section className="row-section">
      <h2 className="row-title">{title}</h2>

      <div className="row-wrapper">
        <button className="row-arrow left" onClick={() => scroll('left')} aria-label="Voltar">
          <i className="fa-solid fa-chevron-left"></i>
        </button>

        <div className="row-track" ref={rowRef}>
          {items.map((item) => {
            const name = item.title || item.name;
            const mediaType = item.media_type || mediaTypeFallback;
            return (
              <Link
                to={`/players/${mediaType}/${item.id}`}
                className="movie-item"
                key={item.id}
              >
                <div className="poster-frame">
                  <img
                    className="movie-image"
                    src={`${imgURL}w300${item.poster_path}`}
                    alt={`Poster de ${name}`}
                    draggable="false"
                    loading="lazy"
                  />
                  {typeof item.vote_average === 'number' && item.vote_average > 0 && (
                    <span className="card-rating">
                      <i className="fa-solid fa-star"></i> {item.vote_average.toFixed(1)}
                    </span>
                  )}
                  <div className="poster-hover">
                    <span className="play-circle">
                      <i className="fa-solid fa-play"></i>
                    </span>
                  </div>
                </div>
                <p className="title-movie">
                  {name.length < 22 ? name : `${name.slice(0, 19)}...`}
                </p>
              </Link>
            );
          })}
        </div>

        <button className="row-arrow right" onClick={() => scroll('right')} aria-label="Avançar">
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </section>
  );
}

function Home() {
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
          axios.get('http://localhost:4000/api/series/popular'),
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
    return (
      <div className="home-loading">
        <p>Carregando...</p>
      </div>
    );
  }

  const heroMovie = trendMovies[0];

  return (
    <>
      <Search />

      {heroMovie && (
        <div className="hero-banner">
          <div className="hero-backdrop">
            <img
              src={`${imgURL}w1280${heroMovie.backdrop_path}`}
              alt={`Destaque: ${heroMovie.title}`}
            />
            <div className="hero-overlay" />
          </div>

          <div className="hero-content">
            <span className="hero-tag">Em alta</span>
            <h1>{heroMovie.title}</h1>
            <p className="hero-overview">
              {heroMovie.overview?.length > 220
                ? `${heroMovie.overview.slice(0, 220)}...`
                : heroMovie.overview}
            </p>
            <Link
              to={`/players/${heroMovie.media_type || 'movie'}/${heroMovie.id}`}
              className="hero-button"
            >
              <i className="fa-solid fa-play"></i> Assistir agora
            </Link>
          </div>
        </div>
      )}

      <div className="rows-container">
        <Row title="Destaques" items={trendMovies} mediaTypeFallback="movie" />
        <Row title="Séries Populares" items={popularSeries} mediaTypeFallback="tv" />
        <Row title="TOP 20" items={topMovies} mediaTypeFallback="movie" />
        <Row title="Lançamentos" items={nextMovies} mediaTypeFallback="movie" />
      </div>
    </>
  );
}

export default Home;