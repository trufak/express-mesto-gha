const router = require('express').Router();
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar
 } = require('../controllers/users');
//получение всех пользователей
router.get('/', getUsers);
//получение пользователя по id
router.get('/:userId', getUser);
//создание пользователя
router.post('/', createUser);
//обновление данных пользователя
router.patch('/me', updateUser);
//обновление аватара пользователя
router.patch('/me/avatar', updateAvatar);

module.exports = router;