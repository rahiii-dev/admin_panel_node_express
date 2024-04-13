
module.exports = (redirectingUrl, excludedUrls) => {
    return (req, res, next) => {
        const isAuthenticated = req.session.isAuthenticated ? true : false;

        if(isAuthenticated && (excludedUrls.includes(req.url)) ){
            return res.redirect('/');
        }
    
        if (!isAuthenticated && (!excludedUrls.includes(req.url))) {
            return res.redirect(redirectingUrl);
        }
    
        next()
    }
}