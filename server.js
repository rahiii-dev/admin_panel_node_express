const express = require('express');
const ecpressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const session =  require('express-session');

const app = express();

const serverConfig = require('./config/serverConfig');
const dbConfig = require('./config/databaseConfig');

// app Setup
app.set('view engine', 'ejs');
app.set('layout', './layouts/default');
app.use(ecpressLayouts);

app.use('/static', express.static('public'));

app.use(session({
    secret: serverConfig.sessionSecret,
    resave: false,
    saveUninitialized: false
}))

app.use(express.urlencoded({extended : true}));

// import middlewares
const methodOverride = require('./middlewares/methodOverrideMiddleware');
const loggerMiddleware = require('./middlewares/loggerMIddleware');
const authMiddleware = require('./middlewares/authMiddleware');
const noCacheMiddleware = require('./middlewares/noCacheMiddleware')

// Middleware Setup
app.use(methodOverride('_method')); 
app.use(loggerMiddleware);
app.use(authMiddleware('/login', ['/login', '/register']));
app.use(['/login', '/register', '/logout', '/'], noCacheMiddleware);

// import router
const homeRouter = require('./routes/homeRouter');
const accountRouter = require('./routes/accountRouter');
const adminRouter = require('./routes/adminRouter');
// router Setup
app.use('/', homeRouter);
app.use('/', accountRouter);
app.use('/', adminRouter);

// error handler
const errorHandlerMiddleware = require('./middlewares/errorHandlerMiddleware');
app.use(errorHandlerMiddleware);

app.listen(serverConfig.port, serverConfig.host, () => {
    console.log(`Server running on: http://${serverConfig.host}:${serverConfig.port}`)
})

// DB Connection
mongoose.connect(dbConfig.url)
.then(() => console.log("Connected to Database..."))
.catch( err => console.log(err, "Error connecting to Database..."))