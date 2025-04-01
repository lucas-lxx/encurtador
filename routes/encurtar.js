const router = require('express').Router();

router.get('/', (req, res, next) => {
  res.render('index');
});

router.post('/link', (req, res, next) => {
  console.log(req.body);
  res.redirect('/link/success');
})

router.get('/link/success', (req, res, next) => {
  res.send('success!');
})

module.exports = router;