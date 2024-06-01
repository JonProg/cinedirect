import dotenv from 'dotenv'

class HomeController{
    async index(req,res){
        res.render('index');
    };

    async submit(req,res){

    };
}

export default new HomeController();