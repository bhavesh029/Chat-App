const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

const sequelize = require('./DB/database');

const User = require('./Models/signup');
const Mesage = require('./Models/message');
const groups = require('./Models/group');
const usergroup = require('./Models/usergroups');

const userRouter = require('./Routes/user');
const msgRouter = require('./Routes/msg');
const grpRouter = require('./Routes/group');

const app = express();

app.use(cors());
dotenv.config();

app.use(bodyParser.json());

app.use('/user', userRouter);
app.use(msgRouter);
app.use(grpRouter);

User.hasMany(Mesage);
Mesage.belongsTo(User);

groups.belongsToMany(User, {through: usergroup});
User.belongsToMany(groups, {through: usergroup});

groups.hasMany(Mesage);
Mesage.belongsTo(groups);

sequelize.sync({})
    .then(() => {
        app.listen(process.env.PORT || 3000);  
    })
    .catch(err => {
        console.log(err);
    })