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
      this.app.get('/', function(req,res){
        return res.render('test')
      });
      this.app.use('/movie', movieRoutes);
    }

    setters(){
      this.app.set('views', resolve(__dirname,'views'));
      this.app.set('view engine','ejs'); //Serve para adicinar a logica do js no html
    }
  
  }

export default new App().app;