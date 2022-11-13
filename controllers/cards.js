const Card = require('../models/card');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ServerError = require('../errors/ServerError');
const errorMessages = require('../utils/errorMessages');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => next(new ServerError(err.message)));
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(errorMessages.cardBadRequest));
      } else next(new ServerError(err.message));
    });
};

const deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (card) {
        if (card.owner.toString() === req.user._id) {
          res.send({ data: card });
        } else next(new BadRequestError(errorMessages.cardDeleteNotOwner));
      } else next(new NotFoundError(errorMessages.cardNotFound));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(errorMessages.cardBadRequest));
      } else next(new ServerError(err.message));
    });
};

const addlikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .then((card) => {
      if (card) res.send({ data: card });
      else next(new NotFoundError(errorMessages.cardNotFound));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(errorMessages.cardBadRequest));
      } else next(new ServerError(err.message));
    });
};

const deletelikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .then((card) => {
      if (card) res.send({ data: card });
      else next(new NotFoundError(errorMessages.cardNotFound));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(errorMessages.cardBadRequest));
      } else next(new ServerError(err.message));
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addlikeCard,
  deletelikeCard,
};
