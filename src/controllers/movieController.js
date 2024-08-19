import dotenv from 'dotenv'
import axios from 'axios'

dotenv.config()

const serchURL = process.env.API_SEARCH;
const apiKey = process.env.API_KEY;
const imgURL = process.env.API_IMG;

class MovieController{
    async index(req,res){
        res.render('index',{movies: false});
    };
}

export default new MovieController();