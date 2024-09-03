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
        var numberPage = req.query.page || 1;
        const params = {
            "api_key": apiKey,
            "query":inputValue,
            "include_adult": false,
            "language":"pt-BR",
            "page":numberPage,
        }

        try {
            const response = await axios.get(serchURL,{params:params})

            if (response.data.results.length < 1) { 
                res.render('index',{movies:false,inputValue});

            }else{
                let movies = response.data.results.filter(movie => movie.poster_path !== null)
                .filter(movie => movie.popularity >= 17)
                .filter(movie => Number(movie.release_date.slice(0,4)) >= 1990)
                .slice(0,15);
                res.render('index', {movies, imgURL});
            }
        } catch (error) {
            console.error('Erro ao fazer a requisição GET:', error);
            res.render('index');
        }
    };
}

export default new HomeController();