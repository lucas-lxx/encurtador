const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { log } = require('../util/log');

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    // defensive programming to not call a .split in authHeader if it is undefinned
    // the && shortcircuits as soon as it sees that authHeader == undefinned == false == && will not be true
    const token = await authHeader && authHeader.split(' ')[1];
    if (!token) return next();
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    req.user = await User.findByPk(payload.user_id, { raw: true});
    log('authenticated user', req.user);
    next();
  } catch (e) {
    // TO-DO: refresh jwt token
    log('authenticate user error', e);
    next();
  }
}

module.exports = authenticate;