const { celebrate, Joi } = require('celebrate');

module.exports = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
});
