import dotenv from 'dotenv'
import axios from 'axios'

dotenv.config()
class HomeController{
    async index(req,res){
        res.render('index');
    };

    async submit(req,res){
        const inputValue = req.body.inputName;
        process.env.API_KEY
        try {
            const response = await axios.get('https://api.themoviedb.org/3/authentication');
            console.log(response.data);
        } catch (error) {
            console.error('Erro ao fazer a requisição GET:', error);
        }
        console.log(inputValue)
        res.render('index')
    };
}

export default new HomeController();