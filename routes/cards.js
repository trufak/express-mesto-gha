const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  addlikeCard,
  deletelikeCard
 } = require('../controllers/cards');

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', addlikeCard);
router.delete('/:cardId/likes', deletelikeCard);

module.exports = router;