const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers,
  getUser,
  updateUser,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');

/* обновление аватара пользователя */
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().uri(),
  }),
}), updateAvatar);
/* получение данных пользователя */
router.get('/:userID', getUser);
/* получение данных текущего пользователя */
router.get('/me', getCurrentUser);
/* обновление данных пользователя */
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser);
/* получение всех пользователей */
router.get('/', getUsers);

module.exports = router;
