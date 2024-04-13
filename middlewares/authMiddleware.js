
module.exports = (redirectingUrl, excludedUrls) => {
    return (req, res, next) => {
        const isAuthenticated = req.session.isAuthenticated ? true : false;
    
        if(isAuthenticated && (excludedUrls.includes(req.url)) ){
            return res.redirect(req.url);
        }
    
        if (!isAuthenticated && (!excludedUrls.includes(req.url))) {
            return res.redirect(redirectingUrl);
        }
    
        next()
    }
}