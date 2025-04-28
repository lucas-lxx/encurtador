const router = require('express').Router();

const encurtarController = require('../controllers/encurtar');

router.get('/', encurtarController.getIndex);

router.post('/link', encurtarController.createShortLink);

router.get('/l/:short_link_id', encurtarController.getShortLink);

module.exports = router;