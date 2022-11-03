const Card = require('../models/card');
const { constants } = require('http2');

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
  const user = req.user;
  Card.create({ name, link, owner: user._id })
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
  User.findByIdAndRemove(req.params.cardId)
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
}

const addlikeCard = (req,res)=>{
  User.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
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
}

const deletelikeCard = (req,res)=>{
  User.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
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
}

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addlikeCard,
  deletelikeCard
}