const User = require("../models/user");
const {
  responseBadRequest,
  responseServerError,
  responseNotFound,
} = require("../utils/responseErrors");
const errorMessages = require("../utils/errorMessages");
const ObjectId = require("mongoose").Types.ObjectId;

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => responseServerError(res, err.message));
};

const getUser = (req, res) => {
  if (ObjectId.isValid(req.params.userId)) {
    User.findById(req.params.userId)
      .then((user) => {
        if (user) res.send({ data: user });
        else responseNotFound(res, errorMessages.userNotFound);
      })
      .catch((err) => {
        if (err.name === "CastError")
          responseNotFound(res, errorMessages.userNotFound);
        else responseServerError(res, err.message);
      });
  } else responseBadRequest(res, errorMessages.userBadRequest);
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError")
        responseBadRequest(res, errorMessages.userBadRequest);
      else responseServerError(res, err.message);
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    }
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "CastError")
        responseNotFound(res, errorMessages.userNotFound);
      else if (err.name === "ValidationError")
        responseBadRequest(res, errorMessages.userBadRequest);
      else responseServerError(res, err.message);
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    }
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "CastError")
        responseNotFound(res, errorMessages.userNotFound);
      else if (err.name === "ValidationError")
        responseBadRequest(res, errorMessages.userBadRequest);
      else responseServerError(res, err.message);
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
};
