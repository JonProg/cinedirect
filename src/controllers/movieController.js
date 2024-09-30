import dotenv from 'dotenv'
import axios from 'axios'
import {validLink} from '../services/movieServices'

dotenv.config()

const apiMovie = process.env.API_MOVIE;
const apiKey = process.env.API_KEY;
const imgURL = process.env.API_IMG;
const apiGenre = process.env.API_GENRE

async function filterMovie(apiRoute, params, numberPage, resultsPerPage){
    let movies = [];
    let currentPage = 1;
    let totalPages = 1;
    const maxPagesToFetch = 10; 

    if (params.page > Math.ceil(movies.length / resultsPerPage)) {
        return false;
    }

    while (movies.length < numberPage * resultsPerPage + 1 && currentPage <= totalPages) {

        if (currentPage > maxPagesToFetch) {
            break;
        }

        params.page = currentPage;
        const response = await axios.get(apiRoute, { params: params });
        totalPages = response.data.total_pages;

        let filteredMovies = response.data.results.filter(movie => {
            return movie.poster_path !== null &&
                movie.popularity >= 11.7 &&
                movie.vote_average >= 6 &&
                Number(movie.release_date.slice(0, 4)) >= 1972 &&
                movie.original_language !== 'ko' &&
                movie.original_language !== 'id';
        });

        movies = movies.concat(filteredMovies);
        currentPage++;

        if (movies.length >= numberPage * resultsPerPage) {
            break;
        }

    }
    return movies;
}

class MovieController{
    async index(req,res){
        const params = {
            "api_key": apiKey,
            "include_adult": false,
            "language":"pt-BR"
        }
        try {
            const response= await axios.get(`${apiMovie}${req.params.id}`,{params:params})
            const movie = response.data
            const links = await validLink(movie.title)
            res.render('movie', {movie, imgURL, links})
            
        } catch (error) {
            console.error('Erro ao fazer a requisição GET:', error);
            res.render('movie');
        }
    };

    async genre(req,res){
        var genre = req.params.genre_id;
        var numberPage = parseInt(req.query.page) || 1;
        const resultsPerPage = 20;

        const params = {
            "api_key" : apiKey,
            "include_adult" : false,
            "language" : "pt-BR",
            "with_genres" : genre
        }

        try {
            filterMovie(apiGenre, params, numberPage, resultsPerPage).then(allMovies=>{
                let movies = allMovies.slice((numberPage - 1) * resultsPerPage, numberPage * resultsPerPage);
                let totalPages = Math.ceil(allMovies.length / resultsPerPage)
                
                res.render('listMovies', { 
                    movies, 
                    imgURL, 
                    totalPages, 
                    inputValue:null,
                    numberPage
                });
            })
        } catch (error) {
            console.error('Erro ao fazer a requisição GET:', error);
            res.render('index');
        }
    }
}

export default new MovieController();