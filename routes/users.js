const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { LINK } = require('../utils/constants');

const {
  getAllUsers, getRequestedUser, patchProfile, patchAvatar, getUser,
} = require('../controllers/users');

router.get('/', getAllUsers);
router.get('/me', getUser);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().required().length(24),
  }),
}), getRequestedUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), patchProfile);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(LINK),
  }),
}), patchAvatar);

module.exports = router;
