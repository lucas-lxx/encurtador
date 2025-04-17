const router = require('express').Router();

const UserController = require('../controllers/user');

router.post('/signup', UserController.createUser);

router.get('/auth', UserController.getUserToken);

module.exports = router;