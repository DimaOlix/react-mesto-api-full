const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ErrorNotFound = require('../error-classes/ErrorNotFound');
const ErrorIncorrectData = require('../error-classes/ErrorIncorrectData');
const ErrorServer = require('../error-classes/ErrorServer');
const ErrorAuthentication = require('../error-classes/ErrerAuthentication');
const ErrorConflict = require('../error-classes/ErrorConflict');


module.exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});

    res.send(users);
  } catch (err) {
    next(new ErrorServer('Произошла ошибка на сервере'));
  }
};

module.exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      next(new ErrorNotFound('Пользователя с таким id не найдено'));
      return;
    }

    res.send(user);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      next(new ErrorIncorrectData('Некорректный id пользователя'));
      return;
    }

    next(new ErrorServer('Произошла ошибка на сервере'));
  }
};

module.exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      next(new ErrorNotFound('Пользователя с таким id не найдено'));
      return;
    }

    res.send(user);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      next(new ErrorIncorrectData('Некорректный id пользователя'));
      return;
    }

    next(new ErrorServer('Произошла ошибка на сервере'));
  }
};

module.exports.createUser = async (req, res, next) => {
  try {
    const password = await bcrypt.hash(req.body.password, 10);
    const {
      name,
      email,
      about,
      avatar,
    } = req.body;

    const user = await User.create({
      name,
      email,
      password,
      about,
      avatar,
    });

    res.send(user.toJSON());
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new ErrorIncorrectData('Переданы некорректные данные'));
      return;
    }

    if (err.code === 11000) {
      next(new ErrorConflict('Пользователь с указанным email уже зарегистрирован'));
      return;
    }

    next(new ErrorServer('Произошла ошибка на сервере'));
  }
};

module.exports.editUserData = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      next(new ErrorNotFound('Пользователя с таким id не найдено'));
      return;
    }

    res.send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new ErrorIncorrectData('Переданы некорректные данные'));
      return;
    }

    next(new ErrorServer('Произошла ошибка на сервере'));
  }
};

module.exports.editUserAvatar = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      next(new ErrorNotFound('Пользователя с таким id не найдено'));
      return;
    }

    res.send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new ErrorIncorrectData(err.errors.avatar));
      return;
    }

    next(new ErrorServer('Произошла ошибка на сервере'));
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
      .select('+password');

    if (!user) {
      next(new ErrorAuthentication('Неверный email или пароль'));
      return;
    }

    const resultCompar = await bcrypt.compare(password, user.password);

    if (!resultCompar) {
      next(new ErrorAuthentication('Неверный email или пароль'));
      return;
    }

    const token = jwt.sign({ _id: user._id }, 'super-secret', { expiresIn: '7d' });

    res.cookie('token', token, {
      maxAge: 3600000 * 24 * 7,
      httpOnly: true,
    })
      .send({ password: user.password })
      .end();
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new ErrorIncorrectData('Переданы некорректные данные'));
      return;
    }

    next(new ErrorServer('Произошла ошибка на сервере'));
  }
};
