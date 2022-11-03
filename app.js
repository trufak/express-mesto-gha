const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { constants } = require('http2');
const { responseNotFound } = require('./utils/responseErrors');
const errorMessages = require('./utils/errorMessages');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
//временное решение по авторизации
app.use((req, res, next) => {
  req.user = {
    _id: '6360e585675360d387fd678b'
  };

  next();
});
//маршрутизация
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));
app.use('*',(req,res)=>responseNotFound(res,errorMessages.incorrectRoute));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})