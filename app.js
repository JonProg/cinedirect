import express from 'express';
import homeRoutes from './src/routes/homeRoutes';
import movieRoutes from './src/routes/movieRoutes';
import loginRoutes from './src/routes/loginRoutes'
import {resolve} from 'path';

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
      this.app.use('/', homeRoutes);
      this.app.use('/movie', movieRoutes);
      //this.app.use('/login', loginRoutes);
    }

    setters(){
      this.app.set('views', resolve(__dirname,'src','views'));
      this.app.set('view engine','ejs'); //Serve para adicinar a logica do js no html
    }
  
  }

export default new App().app;