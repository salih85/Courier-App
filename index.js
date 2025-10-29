require('dotenv').config();
//console.log(process.env)

const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('static'));
app.use(cookieParser());

 const connectDB = require('./confiq/db');

const auth = require('./routes/auth');
const common = require('./routes/common');
const users = require('./routes/user');
const admin = require('./routes/admin');
const { onlyUsers, checkLogin,onlyAdmin } = require('./middlewears/auth');

app.use(checkLogin)

app.use('/', auth);
app.use('/', common);
app.use('/', onlyUsers, users);
app.use('/admin',onlyAdmin, admin);


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("server started at port",port);
  connectDB();
});