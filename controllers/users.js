const User = require('../models/user');
const { constants } = require('http2');

const getUsers = (req,res)=>{
  User.find({})
  .then(users => res.send({ data: users }))
  .catch(err =>
    res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
    .send({ message: err.message })
  );
}

const getUser = (req,res)=>{
  User.findById(req.params.userId)
  .then(user => res.send({ data: user }))
  .catch(err => {
    if(err.name === "CastError")
      res.status(constants.HTTP_STATUS_NOT_FOUND)
      .send({
        message: "Запрашиваемый пользователь не найден"
      });
    else
      res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .send({ message: err.message });
  });
}

const createUser = (req,res)=>{
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
  .then(user => res.send({ data: user }))
  .catch(err => {
    if(err.name === "ValidationError")
      res.status(constants.HTTP_STATUS_BAD_REQUEST)
      .send({
        message: "Переданы некорректные данные о пользователе"
      });
    else
      res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .send({ message: err.message });
  });
}

const updateUser = (req,res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true
  })
  .then(user => res.send({ data: user }))
  .catch(err => {
    if(err.name === "CastError")
      res.status(constants.HTTP_STATUS_NOT_FOUND)
      .send({
        message: "Запрашиваемый пользователь не найден"});
    else if(err.name === "ValidationError")
      res.status(constants.HTTP_STATUS_BAD_REQUEST)
      .send({
        message: "Переданы некорректные данные о пользователе"
      });
    else
      res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .send({ message: err.message });
    });
}

const updateAvatar = (req,res)=>{
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true
  })
  .then(user => res.send({ data: user }))
  .catch(err => {
    if(err.name === "CastError")
      res.status(constants.HTTP_STATUS_NOT_FOUND)
      .send({
        message: "Запрашиваемый пользователь не найден"});
    else if(err.name === "ValidationError")
      res.status(constants.HTTP_STATUS_BAD_REQUEST)
      .send({
        message: "Переданы некорректные данные о пользователе"
      });
    else
      res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .send({ message: err.message });
    });
}


module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar
}