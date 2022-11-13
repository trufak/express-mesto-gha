const { celebrate, Joi } = require('celebrate');

module.exports = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
});
