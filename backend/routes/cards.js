const routerCard = require('express').Router();

const {
  getCards, createCard, deleteCard, setLikeCard, dislikeCard,
} = require('../controllers/cards');

const { validateCreateCard, validateCardId } = require('../middlewares/validations');


routerCard.get('/', getCards);
routerCard.post('/', validateCreateCard, createCard);
routerCard.delete('/:cardId', validateCardId, deleteCard);
routerCard.put('/:cardId/likes', validateCardId, setLikeCard);
routerCard.delete('/:cardId/likes', validateCardId, dislikeCard);

module.exports = routerCard;
