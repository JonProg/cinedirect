import dotenv from 'dotenv'
import axios from 'axios'

dotenv.config()
axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.API_KEY}`;
axios.defaults.headers.post['Content-Type'] = 'application/json';

class HomeController{
    async index(req,res){
        res.render('index');
    };

    async submit(req,res){
        const inputValue = req.body.inputName;
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${inputValue}`)
            console.log(response.data);
        } catch (error) {
            console.error('Erro ao fazer a requisição GET:', error);
        }
        console.log(inputValue)
        res.render('index')
    };
}

export default new HomeController();