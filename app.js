import express from 'express';
import {resolve} from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import axios from 'axios';

dotenv.config()

const serchURL = process.env.API_SEARCH;
const apiKey = process.env.API_KEY;
const imgURL = process.env.API_IMG;
const apiTrend = process.env.API_TREND;
const apiTop = process.env.API_TOP20;
const apiReleases = process.env.API_RELEASES;

class App{
    constructor() {
      this.app = express();
      this.middlewares();
      this.routes();
      this.setters();
    }
  
    middlewares(){
      this.app.use(express.urlencoded({ extended: true }));
      this.app.use(express.json());
      this.app.use(cors());
    }
  
    routes(){
      this.app.get('/', async function(req,res){
        
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

            res.json({
                moviesTrend,
                moviesTop,
                moviesNext,
                imgURL,
            });
        } catch (error) {
            res.send(`${error.message}`);
        }
      });
      this.app.use('/movie', movieRoutes);
    }

    setters(){
      this.app.set('views', resolve(__dirname,'src','views'));
      this.app.set('view engine','ejs'); //Serve para adicinar a logica do js no html
    }
  
  }

export default new App().app;