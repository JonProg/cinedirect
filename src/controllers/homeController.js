import dotenv from 'dotenv'

class HomeController{
    async index(req,res){
        res.render('index');
    };

    async submit(req,res){
        const inputValue = req.body.inputName;
        console.log(inputValue)
        res.render('index')
    };
}

export default new HomeController();