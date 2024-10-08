import express from 'express';
import {resolve} from 'path';
import dotenv from 'dotenv'
import axios from 'axios'

dotenv.config()

const imgURL = process.env.API_IMG;

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
      this.app.use(express.static(resolve(__dirname, 'src','assets')));
    }
  
    routes(){
      this.app.use('/', function(req,res){
        return res.json({test:imgURL})
      });
      this.app.use('/movie', movieRoutes);
    }

    setters(){
      this.app.set('views', resolve(__dirname,'src','views'));
      this.app.set('view engine','ejs'); //Serve para adicinar a logica do js no html
    }
  
  }

export default new App().app;