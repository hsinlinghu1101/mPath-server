/* eslint-disable indent */
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet= require('helmet');
const { NODE_ENV, CLIENT_ORIGIN } = require('./config');
const pairsRouter = require('./pairs/pairs-router');
const usersRouter = require('./users/users-router');
const authRouter = require('./auth/auth-router');
const app = express();

const morganOption = (NODE_ENV ==='production')
  ? 'tiny'
  :'common';

app.use(morgan(morganOption));
app.use(cors());
app.use(helmet());
//app.use(cors({origin: CLIENT_ORIGIN}));


app.use('/api/auth', authRouter);
app.use('/api/user', usersRouter);
app.use('/api/pairs', pairsRouter);
//app.use('/api/room', roomRouter);



app.use(function errorHandler(error, req, res, next){
    console.log(error);
    let response;
    if(NODE_ENV === 'production'){
        response ={ error: { message: 'sever error'}};
    }else{
       
        response ={ message: error.message, error };
    }
    res.status(500).json(response);
});
module.exports = app;