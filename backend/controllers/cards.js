const Card = require('../models/card');
const ErrorNotFound = require('../error-classes/ErrorNotFound');
const ErrorIncorrectData = require('../error-classes/ErrorIncorrectData');
const ErrorServer = require('../error-classes/ErrorServer');
const ErrorForbidden = require('../error-classes/ErrorForbidden');


module.exports.getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});

    res.send(cards);
  } catch (err) {
    next(new ErrorServer('Произошла ошибка на сервере'));
  }
};

module.exports.createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const owner = req.user._id;

    const card = await Card.create({ name, link, owner });

    res.send(card);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new ErrorIncorrectData(err.errors.link));
      return;
    }

    next(new ErrorServer('Произошла ошибка на сервере'));
  }
};

module.exports.deleteCard = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.cardId);

    if (!card) {
      next(new ErrorNotFound('Карточка с данным id не найдена'));
      return;
    }

    // eslint-disable-next-line eqeqeq
    if (card.owner != req.user._id) {
      next(new ErrorForbidden('Нельзя удалять чужие карточки'));
      return;
    }

    await Card.deleteOne(card);
    res.send(card);

    next();
  } catch (err) {
    next(new ErrorServer('Произошла ошибка на сервере'));
  }
};

module.exports.setLikeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );

    if (!card) {
      next(new ErrorNotFound('Карточка с данным id не найдена'));
      return;
    }

    res.send(card);
  } catch (err) {
    next(new ErrorServer('Произошла ошибка на сервере'));
  }
};

module.exports.dislikeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );

    if (!card) {
      next(new ErrorNotFound('Карточка с данным id не найдена'));
      return;
    }

    res.send(card);
  } catch (err) {
    next(new ErrorServer('Произошла ошибка на сервере'));
  }
};
