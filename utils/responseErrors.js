const { constants } = require("http2");

const responseBadRequest = (res, message) => {
  res.status(constants.HTTP_STATUS_BAD_REQUEST).send({ message: message });
};

const responseServerError = (res, message) => {
  res
    .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
    .send({ message: message });
};

const responseNotFound = (res, message) => {
  res.status(constants.HTTP_STATUS_NOT_FOUND).send({ message: message });
};

module.exports = {
  responseBadRequest,
  responseServerError,
  responseNotFound,
};
