const router = require('express').Router();
const {
  getUser,
  updateUser,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');
/* получение пользователя по id */
router.get('/:userId', getUser);
/* получение данных текущего пользователя */
router.get('/me', getCurrentUser);
/* обновление данных пользователя */
router.patch('/me', updateUser);
/* обновление аватара пользователя */
router.patch('/me/avatar', updateAvatar);

module.exports = router;
