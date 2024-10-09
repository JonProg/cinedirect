import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import Search from "./Search";
import Footer from "./Footer";

const apiSearch = import.meta.env.VITE_API_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;
const apiGenre = import.meta.env.VITE_API_GENRE;

function ListMovies() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);

  const movie = searchParams.get("movie");
  const genre = searchParams.get("genre") || false;
  const page = searchParams.get("page") || 1;

  let route = genre !== false ? apiGenre : apiSearch;
  const params = {
    "api_key": apiKey,
    "include_adult": false,
    "language": "pt-BR",
  };

  genre !== false ? (params.with_genres = genre) : (params.query = movie);

  useEffect(() => {
    const fetchMovies = async (apiRoute, params, numberPage, resultsPerPage) => {
      let movies = [];
      let currentPage = 1;
      let totalPages = 1;
      const maxPagesToFetch = 10;

      while (movies.length < numberPage * resultsPerPage && currentPage <= totalPages) {
        if (currentPage > maxPagesToFetch) {
          break;
        }

        params.page = currentPage;
        const response = await axios.get(apiRoute, { params: params });
        totalPages = response.data.total_pages;

        let filteredMovies = response.data.results.filter((movie) => {
          return (
            movie.poster_path !== null &&
            movie.popularity >= 11.7 &&
            movie.vote_average >= 5.4 &&
            Number(movie.release_date.slice(0, 4)) >= 1972 &&
            movie.original_language !== "ko" &&
            movie.original_language !== "id"
          );
        });

        movies = movies.concat(filteredMovies);
        currentPage++;

        if (movies.length >= numberPage * resultsPerPage) {
          movies = movies.slice(0, numberPage * resultsPerPage); // Limita ao número de filmes desejado
          break;
        }
      }
      setMovies(movies);
    };

    fetchMovies(route, params, page, 20); // Passamos '20' como limite de filmes
  }, [route, params, page]);

  return (
    <>
        < Search />
        <div className="grid-movies">
        {movies.map((movie) => (
            <div className="movie-item" key={movie.id}>
            <a href={`/movie/${movie.id}`}>
                <img
                className="movie-image"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={`poster ${movie.title}`}
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

export default ListMovies;
