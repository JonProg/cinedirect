import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Search from './Search';
import axios from 'axios';

const imgURL = 'https://image.tmdb.org/t/p/';

function Movie() {
    const navigate = useNavigate();
    const { type, id } = useParams();
    const [movie, setMovie] = useState(null);
    const [links, setLinks] = useState(null);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await axios.get(`https://cinedirect-api.vercel.app/api/movie/${type}/${id}`);
                const movieData = response.data;

                movieData.title = movieData.title || movieData.name;
                movieData.date = movieData.release_date || movieData.first_air_date;

                const movieLinks = await axios.post('https://cinedirect-api.vercel.app/api/valid-links/', {
                    "movieTitle": movieData.title,
                    "type": `${type}`
                });
                setMovie(movieData);
                setLinks(movieLinks.data);
            } catch (error) {
                console.error('Erro ao fazer a requisição GET:', error);
                navigate('/');
            }
        };
        fetchMovie();
    }, [type, id, navigate]);

    if (!movie) {
        return (
            <div className="home-loading">
                <p>Carregando...</p>
            </div>
        );
    }

    return (
        <>
            <Search />

            <div className="movie-hero">
                <div className="movie-hero-backdrop">
                    <img
                        src={movie.backdrop_path ? `${imgURL}w1280${movie.backdrop_path}` : ''}
                        alt={`Imagem de fundo de ${movie.title}`}
                        loading="lazy"
                    />
                    <div className="movie-hero-overlay" />
                </div>

                <div className="movie-details">
                    <img
                        className="movie-poster"
                        src={movie.poster_path ? `${imgURL}w342${movie.poster_path}` : '/placeholder.png'}
                        loading="lazy"
                        alt={`Poster de ${movie.title}`}
                    />

                    <div className="movie-info">
                        <h1>{movie.title}</h1>

                        <div className="movie-meta">
                            {movie.date && (
                                <span className="meta-badge">
                                    {movie.date.slice(0, 4)}
                                </span>
                            )}
                            {typeof movie.vote_average === 'number' && (
                                <span className="meta-badge rating">
                                    <i className="fa-solid fa-star"></i> {movie.vote_average.toFixed(1)}
                                </span>
                            )}
                            {movie.runtime && (
                                <span className="meta-badge">{movie.runtime} min</span>
                            )}
                        </div>

                        <div className="genre">
                            {movie.genres.map((genre) => (
                                <Link
                                    key={genre.id}
                                    className="genre-pill"
                                    to={`/search?genre=${genre.id}`}
                                >
                                    {genre.name}
                                </Link>
                            ))}
                        </div>

                        <p className="movie-overview">{movie.overview}</p>
                    </div>
                </div>
            </div>

            <div id="movie-links">
                <h2>Links para assistir</h2>
                {links && Object.keys(links).length > 0 ? (
                    <div className="link-container">
                        {Object.entries(links).map(([linkName, linkUrl]) => (
                            <a
                                key={linkName}
                                className="link-card"
                                href={linkUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <i className="fa-solid fa-play">{linkName}</i>
                            </a>
                        ))}
                    </div>
                ) : (
                    <p className="no-links">Nenhum link disponível para este título</p>
                )}
            </div>
        </>
    );
}

export default Movie;