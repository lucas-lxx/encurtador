const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { log } = require('../util/log');

exports.createUser = async (req, res, next) => {
  let retries = 3;
  const { name, email, password } = req.body;
  for (let i = 0; i < retries; i++) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        name: name,
        email: email,
        password: hashedPassword
      });
      console.log(newUser);
      res.status(201).json({success: 'user created successfully!'});
    } catch (e) {
    }
  }
  res.status(500).json({error: 'user not created!'});
}

exports.getUserToken = async (req, res, next) => {
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
    console.log(e);
  }
}