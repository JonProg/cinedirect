import dotenv from 'dotenv'
import axios from 'axios'

dotenv.config()

const serchURL = process.env.API_SEARCH;
const apiKey = process.env.API_KEY;
const imgURL = process.env.API_IMG;
const apiTrend = process.env.API_TREND;
const apiTop = process.env.API_TOP20;
const apiReleases = process.env.API_RELEASES;

async function filterMovie(apiRoute, params, numberPage, inputValue, resultsPerPage){
    let movies = [];
    let currentPage = 1;
    let totalPages = 1;
    const maxPagesToFetch = 7; 

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
                movie.title.toLowerCase().includes(inputValue.toLowerCase());
        });

        movies = movies.concat(filteredMovies);
        currentPage++;

        if (movies.length >= numberPage * resultsPerPage) {
            break;
        }
    }
    return movies;
}

class HomeController{
    async index(req,res){

        const params = {
            "api_key" : apiKey,
            "language" : "pt-BR", 
        }

        try {
            const trendMovies = await axios.get(apiTrend, { params : params });
            const topMovies = await axios.get(apiTop, { params : params });
            const nextMovies = await axios.get(apiReleases, { params : params });

            let moviesTop = topMovies.data.results.slice(0,20)
            let moviesTrend = trendMovies.data.results

            const currentYear = new Date().getFullYear();
            let moviesNext = nextMovies.data.results.filter(movie => {
                return new Date(movie.release_date).getFullYear() === currentYear;
            });

            res.render('index',{
                moviesTrend,
                moviesTop,
                moviesNext,
                imgURL,
            });
        } catch (error) {
            res.send(`
                <h1>Ocorreu um erro</h1>
                <p>${error.message}</p>
                <pre>${error.stack}</pre>
            `);
        }
    };

    async search(req,res){
        if (!req.query.movie){
            return res.redirect('/')
        }
        var inputValue = req.query.movie;
        var numberPage = parseInt(req.query.page) || 1;
        const resultsPerPage = 20;

        const params = {
            "api_key": apiKey,
            "query":inputValue,
            "include_adult": false,
            "language":"pt-BR",
        }

        try {
            filterMovie(serchURL, params, numberPage, inputValue, resultsPerPage).then(allMovies=>{
                let movies = allMovies.slice((numberPage - 1) * resultsPerPage, numberPage * resultsPerPage);
                let totalPages = Math.ceil(allMovies.length / resultsPerPage)
                
                if (movies.length < 1) {
                    res.render('listMovies', { movies: false, inputValue, numberPage:false });
                } else {
                    res.render('listMovies', { 
                        movies, 
                        imgURL, 
                        totalPages, 
                        inputValue,
                        numberPage
                    });
                }
            })
        } catch (error) {
            console.error('Erro ao fazer a requisição GET:', error);
            res.render('index');
        }
    };
}

export default new HomeController();