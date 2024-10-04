import Login from '../models/loginModel'

class LoginController{

    async index(req,res){
        if(req.session.user) return res.render('logon')
        res.render('login');
    };

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

    async logon (req,res){
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