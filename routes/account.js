const router = require('express').Router();

const UserController = require('../controllers/user');

router.get('/signup', UserController.createUser);

module.exports = router;