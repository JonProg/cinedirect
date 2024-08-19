import dotenv from 'dotenv'
import axios from 'axios'

dotenv.config()

const serchURL = process.env.API_SEARCH;
const apiKey = process.env.API_KEY;
const imgURL = process.env.API_IMG;

class HomeController{
    async index(req,res){
        res.render('index',{movies: false});
    };

    async submit(req,res){
        const inputValue = req.body.inputName;
        const params = {
            "api_key": apiKey,
            "query":inputValue,
            "include_adult": false,
            "language":"pt-BR"
        }

        try {
            const response = await axios.get(serchURL,{params:params})

            var movies = response.data.results
            .filter(movie => movie.poster_path !== null)
            .filter(movie => Number(movie.release_date.slice(0,4)) >= 1999)
            .slice(0,10);

            res.render('index', {movies, imgURL})

        } catch (error) {
            console.error('Erro ao fazer a requisição GET:', error);
            res.render('index',{movies: false});
        }
    };
}

export default new HomeController();