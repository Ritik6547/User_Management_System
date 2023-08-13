const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');
const connectDB = require('./server/db/connection');

// Express App
const app = express();

// .env and port
dotenv.config({path:'.env'})
const PORT = process.env.PORT ||8080

//console log request
app.use(morgan('tiny'));

// mongodb connection
connectDB();

// parse request to body-parser
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());

// set view engine
app.set('view engine','ejs')
app.set("views",path.resolve(__dirname,"views"))

// static files
app.use('/css',express.static(path.resolve(__dirname,"public/css")));
app.use('/img',express.static(path.resolve(__dirname,"public/img")));
app.use('/js',express.static(path.resolve(__dirname,"public/js")));


// load routers
app.use('/',require('./server/routes/router'))
// app.use('/add-user',require('./server/routes/router'))
// app.use('/update-user',require('./server/routes/router'))

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})