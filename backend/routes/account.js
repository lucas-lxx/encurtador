const router = require('express').Router();

const UserController = require('../controllers/user');

router.post('/signup', UserController.createUser);

router.get('/signup', async (req, res, next) => {
  res.render('signup-login', {
    path: '/account/signup'
  })
});

router.post('/login', UserController.getLogin);

router.get('/login', async (req, res, next) => {
  res.render('signup-login', {
    path: '/account/login'
  })
});

module.exports = router;