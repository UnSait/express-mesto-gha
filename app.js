const { BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR } = require('./utils/constants');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb');

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = { _id: '62ae3d9c678d0e5cc54b8642' };
  next();
});

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use((req, res) => {
  res.status(NOT_FOUND).send({ message: 'Страницы не существует' });
  return;
});

app.use((err, req, res, next) => {
  if (err.name === 'CastError' || err.name === 'ValidationError') {
    res.status(BAD_REQUEST).send({ message: `Переданы некорректные данные: ${err.message}` });
    return;
  }
  res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла непредвиденная ошибка' });
  return;
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
