import express from 'express';
import homeRoutes from './src/routes/homeRoutes';
import movieRoutes from './src/routes/movieRoutes';
import { resolve } from 'path';
import dotenv from 'dotenv';

class App {
  constructor() {
    dotenv.config(); // Carrega variáveis de ambiente do .env
    this.app = express();
    this.middlewares();
    this.routes();
    this.setters();
    this.listen(); // Inicia o servidor aqui
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(express.static(resolve(__dirname, 'src', 'assets')));
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/movie', movieRoutes);
  }

  setters() {
    this.app.set('views', resolve(__dirname, 'src', 'views'));
    this.app.set('view engine', 'ejs'); // Serve para adicionar a lógica do js no html
  }

  listen() {
    const port = process.env.PORT || 3000; // Define a porta a ser utilizada
    this.app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  }
}

export default new App().app; // Exporta a instância do app
