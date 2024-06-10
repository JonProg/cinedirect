import dotenv from 'dotenv'

dotenv.config()
class HomeController{
    async index(req,res){
        res.render('index');
    };

    async submit(req,res){
        const inputValue = req.body.inputName;
        process.env.API_KEY
        console.log(inputValue)
        res.render('index')
    };
}

export default new HomeController();