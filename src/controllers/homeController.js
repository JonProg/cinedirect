import dotenv from 'dotenv'
import axios from 'axios'

dotenv.config()

const serchURL = process.env.API_SEARCH;
const apiKey = process.env.API_KEY;
const imgURL = process.env.API_IMG;

class HomeController{
    async index(req,res){
        res.render('index',{movies:false, inputValue: null});
    };

    async search(req,res){
        var inputValue = req.query.movie;
        var numberPage = parseInt(req.query.page) || 1;
        const resultsPerPage = 20;
        let allMovies = [];
        let currentPage = 1;
        let totalPages = 1;

        const params = {
            "api_key": apiKey,
            "query":inputValue,
            "include_adult": false,
            "language":"pt-BR",
        }

        try {
            while (allMovies.length < numberPage * resultsPerPage && currentPage <= totalPages) {
                params.page = currentPage;
                const response = await axios.get(serchURL, { params: params });
                totalPages = response.data.total_pages;
    
                let filteredMovies = response.data.results.filter(movie => {
                    return movie.poster_path !== null &&
                        movie.popularity >= 17 &&
                        Number(movie.release_date.slice(0, 4)) >= 1990 &&
                        movie.title.toLowerCase().includes(inputValue);
                });
    
                allMovies = allMovies.concat(filteredMovies);
                currentPage++;
            }
    
            let movies = allMovies.slice((numberPage - 1) * resultsPerPage, numberPage * resultsPerPage);
            console.log(numberPage, Math.ceil(allMovies.length / resultsPerPage))

            if (movies.length < 1) {
                res.render('index', { movies: false, inputValue });
            } else {
                res.render('index', { 
                    movies, 
                    imgURL, 
                    totalPages: Math.ceil(allMovies.length / resultsPerPage), 
                    inputValue,
                    numberPage
                });
            }
        } catch (error) {
            console.error('Erro ao fazer a requisição GET:', error);
            res.render('index');
        }
    };
}

export default new HomeController();