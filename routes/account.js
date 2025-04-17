const router = require('express').Router();

const UserController = require('../controllers/user');

router.post('/signup', UserController.createUser);

module.exports = router;