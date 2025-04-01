const router = require('express').Router();

const encurtarController = require('../controllers/encurtar');

router.get('/', encurtarController.getIndex);

router.post('/link', encurtarController.createShortLink);

router.get('/link/success', encurtarController.createLinkSuccess);

module.exports = router;