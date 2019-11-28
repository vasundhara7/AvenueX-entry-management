var express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var connection = require('./connection');
const cors=require('cors');


var app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/entry',require('./routes/entries'));


// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.render('notFound');
});

//listn to port
app.listen(8000);
console.log('You are listening to port 8000');