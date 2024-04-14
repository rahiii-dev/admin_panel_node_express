module.exports = {
    /*  
        Route: GET /
        Purpose: Render the homepage
    */
    renderHomePage : (req, res) => {
        if(req.session.user.role === "admin"){
            return res.redirect('/admin/dashboard');
        }

        res.render('home', {title : "Home Page", user: req.session.user})
    },
}