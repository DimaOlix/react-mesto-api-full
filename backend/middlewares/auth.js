const jwt = require('jsonwebtoken');
const ErrorAuthentication = require('../error-classes/ErrerAuthentication');
const ErrorServer = require('../error-classes/ErrorServer');


module.exports.auth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      next(new ErrorAuthentication('Отсутствует токен'));
      return;
    }

    const payload = jwt.verify(token, 'super-secret');

    req.user = payload;
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      next(new ErrorAuthentication('Некорректный токен'));
      return;
    }

    next(new ErrorServer(err));
  }
  next();
};
