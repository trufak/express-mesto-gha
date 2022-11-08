require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const errorMessages = require('./utils/errorMessages');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/NotFoundError');

const { PORT } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
/* авторизация */
app.post('/signin', login);

app.post('/signup', createUser);

/* маршрутизация */
app.use('/users', auth, require('./routes/users'));

app.use('/cards', auth, require('./routes/cards'));

app.use('*', (req, res) => new NotFoundError(errorMessages.incorrectRoute));

app.use((err, req, res, next) => {
  res
    .status(err.statusCode)
    .send(err.message);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
