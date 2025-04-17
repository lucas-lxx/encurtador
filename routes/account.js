const router = require('express').Router();

const UserController = require('../controllers/user');

router.post('/signup', UserController.createUser);

router.get('/login', UserController.getLogin);

module.exports = router;