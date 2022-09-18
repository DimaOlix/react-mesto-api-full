const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const routerUser = require('./routes/users');
const routerCard = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const { auth } = require('./middlewares/auth');
const { errorHandler } = require('./middlewares/errorHandler');
const { handleCors } = require('./middlewares/handleCors');
const { validateCreateUser, validateLogin } = require('./middlewares/validations');
// const { requestLogger, errorLogger } = require('./middlewares/logger');


const { PORT = 3001 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(handleCors);

// app.use(requestLogger);

app.post('/signin', validateLogin, login);
app.post('/signup', validateCreateUser, createUser);

app.use(auth);

app.use('/users', routerUser);
app.use('/cards', routerCard);

// app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.use('*', (req, res, next) => {
  res.status(404).send({ message: 'Неверный адрес запроса' });
  next();
});

async function connect() {
  await mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  });

  await app.listen(PORT);
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
}

connect();
