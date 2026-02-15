const express = require('express');
const userRouter = require('./routes/user.routes'); //import all routers in that file

const dotenv = require('dotenv');
dotenv.config();

const connectToDB=require('./config/db');
connectToDB();

const cookieParser = require('cookie-parser');

const app = express();

const indexRouter = require('./routes/index.routes') // import everything in index.routes file


// JasonBrody1122331

app.set('view engine', 'ejs');

app.use(cookieParser())


// built in middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}))
// app.get('/', (req,res) => {
//     res.render("index");
// })  erase all these get functions . we will do them individually in routers

app.use('/', indexRouter)  // since its just / it will redirect to indexrouter. we will add more routes in indexrouter
app.use('/user', userRouter)

// to use router for this. we will do /user/test

const PORT = process.env.PORT || 3000 ;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})