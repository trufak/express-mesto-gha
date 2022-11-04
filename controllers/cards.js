const Card = require('../models/card');
const {
  responseBadRequest,
  responseServerError,
  responseNotFound,
} = require('../utils/responseErrors');
const errorMessages = require('../utils/errorMessages');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => responseServerError(res, err.message));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        responseBadRequest(res, errorMessages.cardBadRequest);
      } else responseServerError(res, err.message);
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (card) res.send({ data: card });
      else responseNotFound(res, errorMessages.cardNotFound);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        responseNotFound(res, errorMessages.cardNotFound);
      } else responseServerError(res, err.message);
    });
};

const addlikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .then((card) => {
      if (card) res.send({ data: card });
      else responseNotFound(res, errorMessages.cardNotFound);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        responseNotFound(res, errorMessages.cardNotFound);
      } else responseServerError(res, err.message);
    });
};

const deletelikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .then((card) => {
      if (card) res.send({ data: card });
      else responseNotFound(res, errorMessages.cardNotFound);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        responseNotFound(res, errorMessages.cardNotFound);
      } else responseServerError(res, err.message);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addlikeCard,
  deletelikeCard,
};
