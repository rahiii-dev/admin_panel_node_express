
module.exports = (req, res, next) => {
    const isAuthenticated = req.session.isAuthenticated ? true : false;

    const isLoginPage = (req.url === '/login');
    const isRegisterPage = (req.url === '/register');

    if((isLoginPage && isAuthenticated || isRegisterPage && isAuthenticated)){
        return res.redirect('/');
    }

    if((!isLoginPage || !isRegisterPage) && !isAuthenticated){
        return res.redirect('/login')
    }

    next()
}