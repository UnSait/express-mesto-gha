const router = require('express').Router();

const {
  getAllUsers, createProfile, getRequestedUser, patchProfile, patchAvatar,
} = require('../controllers/users');

router.get('/', getAllUsers);
router.post('/', createProfile);
router.get('/:userId', getRequestedUser);

router.patch('/me', patchProfile);
router.patch('/me/avatar', patchAvatar);

module.exports = router;
