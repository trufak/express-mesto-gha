const { constants } = require('http2');

const responseBadRequest = (res, message) => {
  res.status(constants.HTTP_STATUS_BAD_REQUEST).send({ message });
};

const responseServerError = (res, message) => {
  res
    .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
    .send({ message });
};

const responseNotFound = (res, message) => {
  res.status(constants.HTTP_STATUS_NOT_FOUND).send({ message });
};

module.exports = {
  responseBadRequest,
  responseServerError,
  responseNotFound,
};
