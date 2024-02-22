import dotenv from 'dotenv'

class HomeController{
    async index(req,res){
        res.render('index');
        return
    };
}

export default new HomeController();