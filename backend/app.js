// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();

const {
  NODE_ENV,
  PORT,
  MONGO_URI,
} = process.env;

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const routerUser = require('./routes/users');
const routerCard = require('./routes/cards');
const { login, createUser, exitThe } = require('./controllers/users');
const { auth } = require('./middlewares/auth');
const { errorHandler } = require('./middlewares/errorHandler');
const { handleCors } = require('./middlewares/handleCors');
const { validateCreateUser, validateLogin } = require('./middlewares/validations');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(handleCors);

app.use(requestLogger);

app.post('/signin', validateLogin, login);
app.post('/signup', validateCreateUser, createUser);

app.use(auth);

app.post('/signout', exitThe);

app.use('/users', routerUser);
app.use('/cards', routerCard);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.use('*', (req, res, next) => {
  res.status(404).send({ message: 'Неверный адрес запроса' });
  next();
});

async function connect() {
  await mongoose.connect(NODE_ENV === 'production'
    ? MONGO_URI
    : 'mongodb://localhost:27017/mestodb',
  {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  });

  await app.listen(NODE_ENV === 'production' ? PORT : 3000);
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${NODE_ENV === 'production' ? PORT : 3000}`);
}

connect();
