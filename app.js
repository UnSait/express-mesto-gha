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

app.use((err, req, res, next) => {
  if (err.name === 'CastError' || err.name === 'ValidationError') {
    res.status(400).send({ message: `Переданы некорректные данные: ${err.message}` });
  }
  next();
});

app.use((req, res) => {
  res.status(500).send({ message: 'Произошла непредвиденная ошибка' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
