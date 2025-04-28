const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { default: emailValidator } = require('node-email-verifier');

const User = require('../models/user');
const { log } = require('../util/log');
const { EmailValidationError } = require('../util/error/email');

exports.createUser = async (req, res, next) => {
  let retries = 3;
  const { name, email, password } = req.body;
  for (let i = 0; i < retries; i++) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const isEmailValid = await emailValidator(email, {checkMx: true, timeout: "10s"});
      if (!isEmailValid) throw new EmailValidationError('email is not valid');
      const newUser = await User.create({
        name: name,
        email: email,
        password: hashedPassword
      });
      log('new user', newUser);
      return res.status(201).json({success: 'user created successfully!'});
    } catch (e) {
      log('create user error', e);
      if (e.name === 'SequelizeUniqueConstraintError' && e.errors[0].path === 'email') {
        return res.status(409).json({
          error_message: 'email already taken',
          error: ['email']
        });
      }
      if (e.name === 'EmailValidationError') {
        console.log(e.message);
        return res.status(400).json({
          error_message: e.message,
          error: ['email']
        })
      }
    }
  }
  res.status(500).json({error: 'user not created!'});
}

exports.getLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const users = await User.findAll({where: {email: email}});
    const user = users[0];
    if (!user) res.status(401).json({ 'error': 'Invalid email credentials'});
    const match = await bcrypt.compare(password, user.password);
    if (!match) res.status(401).json({ 'error': 'Invalid password credentials'});
    const token = await jwt.sign({user_id: user.id}, process.env.SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (e) {
    log('get login error', e);
  }
}