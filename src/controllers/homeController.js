import dotenv from 'dotenv'
import axios from 'axios'

dotenv.config()

const serchURL = process.env.API_SEARCH;
const apiKey = process.env.API_KEY;
let movies = [];

class HomeController{
    async index(req,res){
        res.render('index', {movies});
    };

    async submit(req,res){
        const inputValue = req.body.inputName;
        try {
            const response = await axios.get(`${serchURL}${apiKey}&query=${inputValue}&include_adult=false&language=pt-BR`)
            movies = response.data.results.slice(0,10)
            res.render('index',{movies})
        } catch (error) {
            console.error('Erro ao fazer a requisição GET:', error);
        }
        res.render('index')
    };
}

export default new HomeController();