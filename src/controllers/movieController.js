import dotenv from 'dotenv'
import axios from 'axios'

dotenv.config()

const apiMovie = process.env.API_MOVIE;
const apiKey = process.env.API_KEY;
const imgURL = process.env.API_IMG;

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
            res.render('movie', {movie, imgURL})
            
        } catch (error) {
            console.error('Erro ao fazer a requisição GET:', error);
            res.render('movie', movie);
        }
    };
}

export default new MovieController();