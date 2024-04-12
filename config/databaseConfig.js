if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

module.exports = {
    url: process.env.DB_URL,
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
};


