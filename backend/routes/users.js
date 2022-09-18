const routerUser = require('express').Router();
const { validateEditAvatar, validateEditUser, validateUserId } = require('../middlewares/validations');

const {
  getUsers,
  getUserById,
  getUser,
  editUserData,
  editUserAvatar,
} = require('../controllers/users');


routerUser.get('/', getUsers);
routerUser.get('/me', getUser);
routerUser.get('/:userId', validateUserId, getUserById);
routerUser.patch('/me', validateEditUser, editUserData);
routerUser.patch('/me/avatar', validateEditAvatar, editUserAvatar);

module.exports = routerUser;
