const Card = require('../models/card');
const { constants } = require('http2');
const ObjectId = require('mongoose').Types.ObjectId;

const getCards = (req,res)=>{
  Card.find({})
  .populate('owner')
  .then(cards => res.send({ data: cards }))
  .catch(err =>
    res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
    .send({ message: err.message })
  );
}

const createCard = (req,res)=>{
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
  .then(card => res.send({ data: card }))
  .catch(err => {
    if(err.name === "ValidationError")
      res.status(constants.HTTP_STATUS_BAD_REQUEST)
      .send({
        message: "Переданы некорректные данные карточки"
      });
    else
      res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .send({ message: err.message });
  });
}

const deleteCard = (req,res)=>{
  if (ObjectId.isValid(req.params.cardId)) {
    Card.findByIdAndRemove(req.params.cardId)
    .then(card => res.send({ data: card }))
    .catch(err => {
      if(err.name === "CastError")
        res.status(constants.HTTP_STATUS_NOT_FOUND)
        .send({
          message: "Запрашиваемая карточка не найдена"
        });
      else
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .send({ message: err.message });
    });
  } else {
    res.status(constants.HTTP_STATUS_BAD_REQUEST)
    .send({
      message: "Переданы некорректные данные карточки"
    });
  }

}

const addlikeCard = (req,res)=>{
  if (ObjectId.isValid(req.params.cardId)) {
    Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true,
        runValidators: true })
    .then(card => {
      if (card)
        res.send({ data: card });
      else
        res.status(constants.HTTP_STATUS_NOT_FOUND)
        .send({
          message: "Запрашиваемая карточка не найдена"
        });
    })
    .catch(err => {
      if(err.name === "CastError")
        res.status(constants.HTTP_STATUS_NOT_FOUND)
        .send({
          message: "Запрашиваемая карточка не найдена"
        });
      else
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .send({ message: err.message });
    });
  } else {
    res.status(constants.HTTP_STATUS_BAD_REQUEST)
    .send({
      message: "Переданы некорректные данные карточки"
    });
  }

}

const deletelikeCard = (req,res)=>{
  if (ObjectId.isValid(req.params.cardId)) {
    Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true,
        runValidators: true },
    )
    .then(card => {
      if (card)
        res.send({ data: card });
      else
        res.status(constants.HTTP_STATUS_NOT_FOUND)
        .send({
          message: "Запрашиваемая карточка не найдена"
        });
    })
    .catch(err => {
      if(err.name === "CastError")
        res.status(constants.HTTP_STATUS_NOT_FOUND)
        .send({
          message: "Запрашиваемая карточка не найдена"
        });
      else
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .send({ message: err.message });
    });
  } else {
    res.status(constants.HTTP_STATUS_BAD_REQUEST)
    .send({
      message: "Переданы некорректные данные карточки"
    });
  }

}

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addlikeCard,
  deletelikeCard
}