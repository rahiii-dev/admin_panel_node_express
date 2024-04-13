module.exports = {
    // '/'
    get : (req, res) => {
        res.render('home', {title : "Home Page", user: req.session.user})
    }
}