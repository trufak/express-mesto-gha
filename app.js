require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const {
  userBodyValidator,
  userLoginValidator,
} = require('./utils/celebrateValidators');
const errorMessages = require('./utils/errorMessages');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/NotFoundError');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
/* авторизация */
app.post('/signin', userLoginValidator, login);
/* регистрация */
app.post('/signup', userBodyValidator, createUser);
/* маршрутизация */
app.use('/users', auth, require('./routes/users'));

app.use('/cards', auth, require('./routes/cards'));

app.use('*', (req, res, next) => {
  next(new NotFoundError(errorMessages.incorrectRoute));
});

/* обработка ошибок */
app.use(errors());

app.use((err, req, res, next) => {
  res
    .status(err.statusCode)
    .send({ message: err.message });
  next();
});
/* включение API */
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
