import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import Search from "./Search";
import Footer from "./Footer";
import Pagination from "./Pagination";

const apiSearch = import.meta.env.VITE_API_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;
const apiGenre = import.meta.env.VITE_API_GENRE;

function ListMovies() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const inputValue = searchParams.get("movie") || false;
  const genre = searchParams.get("genre") || false;
  const page = searchParams.get("page") || 1;

  let route = genre !== false ? apiGenre : apiSearch;

  const params = {
    "api_key": apiKey,
    "include_adult": false,
    "language": "pt-BR",
  };

  genre !== false ? (params.with_genres = genre) : (params.query = inputValue);

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
        const response = await axios.get(apiRoute, { params });
        totalPages = response.data.total_pages;

        let filteredMovies = response.data.results.filter((movie) => {
          let isValidMovie = (
            movie.poster_path !== null &&
            movie.popularity >= 11.7 &&
            movie.vote_average >= 5.4 &&
            Number(movie.release_date.slice(0, 4)) >= 1972 &&
            movie.original_language !== "ko" &&
            movie.original_language !== "id"
          );

          if(inputValue){
            isValidMovie = isValidMovie && movie.title.toLowerCase().includes(inputValue.toLowerCase());
          }

          return isValidMovie;
        });

        movies = movies.concat(filteredMovies);
        currentPage++;

        if (movies.length >= numberPage * resultsPerPage) {
          break;
        }
      }
      //console.log(movies.length)
      console.log(Math.ceil(movies.length / resultsPerPage))
      setMovies(movies.slice((numberPage - 1) * resultsPerPage, numberPage * resultsPerPage));
      setTotalPages(Math.ceil(movies.length / resultsPerPage))
    };
    fetchMovies(route, params, page, 20); 
  }, [inputValue,page]);

  if (movies.length < 1){
    return navigate('/')
  }

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
        <Pagination
        numberPage={page}
        totalPages={totalPages} 
        inputValue={inputValue}
        genreValue={genre}
        />
        <Footer />
    </>
    );
}

export default ListMovies;
