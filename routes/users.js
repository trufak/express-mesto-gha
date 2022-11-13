const router = require('express').Router();
const userIdValidator = require('../utils/celebrateValidators/userIdValidator');
const userDescriptValidator = require('../utils/celebrateValidators/userDescriptValidator');
const userAvatarValidator = require('../utils/celebrateValidators/userAvatarValidator');

const {
  getUsers,
  getUser,
  updateUser,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');

/* обновление аватара пользователя */
router.patch('/me/avatar', userAvatarValidator, updateAvatar);
/* получение данных текущего пользователя */
router.get('/me', getCurrentUser);
/* обновление данных пользователя */
router.patch('/me', userDescriptValidator, updateUser);
/* получение данных пользователя */
router.get('/:userId', userIdValidator, getUser);
/* получение всех пользователей */
router.get('/', getUsers);

module.exports = router;
