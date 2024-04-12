if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

module.exports = {
    port : process.env.PORT || 3000,
    host : process.env.HOST || 'localhost',
    sessionSecret : process.env.SESSION_SECRET
}