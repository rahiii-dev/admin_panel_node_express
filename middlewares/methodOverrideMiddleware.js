module.exports = (getterQuery) => {
    
    return (req, res, next) => {

        if(req.query[getterQuery] && ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'].includes(req.query[getterQuery].toUpperCase())){
            req.method = req.query[getterQuery];
            delete req.query[getterQuery];
        }
        
        next();
    }
}