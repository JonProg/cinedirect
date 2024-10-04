import Login from '../models/loginModel'

class LoginController{
    async register (req,res){
        try{
            const login = new Login(req.body);
            await login.register();
        
            if(login.errors.length > 0){
                req.flash('errors',login.errors);
                req.session.save(() => {
                    return res.redirect('/login');
                });
            }else{
                req.flash('success','Usúario criado com sucesso.');
                req.session.save(function(){
                    return res.redirect('/login');
                });
            }
        }catch(e){
            console.log(e);
            res.render('404');
        }
    };

    async login (req,res){
        try{
            const login = new Login(req.body);
            await login.login();
        
            if(login.errors.length > 0){
                req.flash('errors',login.errors);
                req.session.save(() => {
                    return res.redirect('/login');
                });
            }else{
                req.session.user = login.user;
                req.flash('success','Usúario logado com sucesso.');
                req.session.save(function(){
                    return res.redirect('/login');
                });
            }
        }catch(e){
            console.log(e);
            res.render('404');
        }
    };

    async logout(req,res){
        req.session.destroy();
        res.redirect('/');
    }
}

export default new LoginController();