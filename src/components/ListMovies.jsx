import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams} from "react-router-dom";
import axios from "axios";
import Search from "./Search";
import Footer from "./Footer";
import Pagination from "./Pagination";

function ListMovies() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const query = searchParams.get("movie") || false;
  const genre = searchParams.get("genre") || false;
  const page = searchParams.get("page") || 1;

  const params = {
    query,
    genre,
    page
  }

  useEffect(() => {
    const fetchMovies = async (params, numberPage, resultsPerPage) => {
      let movies = [];
      let currentPage = 1;
      let totalPages = 1;
      const maxPagesToFetch = 10;

      while (movies.length < numberPage * resultsPerPage && currentPage <= totalPages) {
        if (currentPage > maxPagesToFetch) {
          break;
        }

        params.page = currentPage;
        const response = await axios.get('http://127.0.0.1:4000/api/movies', { params });
        totalPages = response.data.total_pages;

        let filteredMovies = response.data.results.filter((movie) => {
          let isValidMovie = (
            movie.poster_path !== null &&
            movie.popularity >= 11.7 &&
            movie.vote_average >= 5.4 &&
            Number(movie.release_date.slice(0, 4)) >= 1972 &&
            movie.original_language !== "ko" &&
            movie.original_language !== "id" &&
            movie.original_language !== "cn" 
          );

          if(query){
            isValidMovie = isValidMovie && movie.title.toLowerCase().includes(query.toLowerCase());
          }

          return isValidMovie;
        });
        
        movies = movies.concat(filteredMovies);
        currentPage++;

        if (movies.length >= numberPage * resultsPerPage) {
          break;
        }
      }
      const uniqueMovies = Array.from(new Set(movies.map(movie => movie.id)))
        .map(id => {
          return movies.find(movie => movie.id === id);
      });

      const start = (numberPage - 1) * resultsPerPage;
      console.log(start)

      setMovies(uniqueMovies.slice((numberPage - 1) * resultsPerPage, numberPage * resultsPerPage));
      setTotalPages(Math.ceil(uniqueMovies.length / resultsPerPage))
    };
    fetchMovies(params, page, 20); 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, page]);

  if (movies.length < 1){
    return navigate('/')
  }

  return (
    <>
        < Search />
        <div className="grid-movies">
        {movies.map((movie) => (
            <div className="movie-item" key={movie.id}>
            <Link to={`/movie/${movie.id}`}>
                <img
                className="movie-image"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={`poster ${movie.title}`}
                draggable="false"
                loading='lazy'
                />
            </Link>
            <Link to={`/movie/${movie.id}`}>
            <p className="title-movie">
                {movie.title.length < 20 ? movie.title : `${movie.title.slice(0, 17)}...`}
            </p>
            </Link>
            </div>
        ))}
        </div>
        <Pagination
        numberPage={page}
        totalPages={totalPages} 
        inputValue={query}
        genreValue={genre}
        />
        <Footer />
    </>
    );
}

export default ListMovies;
