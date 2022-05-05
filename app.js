const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

const sequelize = require('./DB/database');
const User = require('./Models/signup');

const userRouter = require('./Routes/user');

const app = express();

app.use(cors());
dotenv.config();

app.use(bodyParser.json());

app.use('/user', userRouter);

sequelize.sync()
    .then(() => {
        app.listen(process.env.PORT || 3000);  
    })
    .catch(err => {
        console.log(err);
    })