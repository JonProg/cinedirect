import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FourSquare } from "react-loading-indicators";
import Search from './Search';
import Footer from './Footer';
import axios from 'axios';

const imgURL = 'https://image.tmdb.org/t/p/';

function Movie() {
    const navigate = useNavigate();
    const { id } = useParams(); 
    const [movie, setMovie] = useState(null); 
    const [links, setLinks] = useState(null); 


    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/movie/${id}`);
                const movieData = response.data;
                const movieLinks = await axios.post('http://localhost:4000/api/valid-links', {
                    "movieTitle":movieData.title,
                });

                setMovie(movieData);
                setLinks(movieLinks.data);
            } catch (error) {
                console.error('Erro ao fazer a requisição GET:', error);
                navigate('/'); 
            }
        };
        fetchMovie();

    }, []); 

    if (!movie) {
        return (
            <div className="loading-container">
                <FourSquare color="white" size="medium" text="" textColor="" />; 
            </div>
        )
    }

    return (
        <>
            <Search />
            <div className="movie-details">
                <img
                    src={`${imgURL}w200${movie.poster_path}`}
                    loading="lazy"
                    alt={`Poster de ${movie.title}`}
                />
                <div className="movie-info">
                    <h1>{movie.title} ({movie.release_date.slice(0, 4)})</h1>
                    <p>{movie.overview}</p>
                    <div className='genre'>
                        {movie.genres.map((genre) => (
                            <a
                                key={genre.id}
                                className="link-hover"
                                href={`/search?genre=${genre.id}`}
                            >
                                {genre.name}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            <img
                src={`${imgURL}w500${movie.backdrop_path}`}
                id="backdrop-movie"
                loading="lazy"
                alt={`Imagem de fundo de ${movie.title}`}
            />

            <div id="movie-links">
                <h1>Links para o filme:</h1>
                {links && Object.keys(links).length > 0 ? (
                    <div className="link-container">
                        {Object.entries(links).map(([linkName, linkUrl]) => (
                            <a
                                key={linkName}
                                className="link-hover"
                                href={linkUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {linkName}
                            </a>
                        ))}
                    </div>
                ) : (
                    <p>Nenhum link para o filme escolhido</p>
                )}
            </div>
            <Footer />
        </>
    );
}

export default Movie;
