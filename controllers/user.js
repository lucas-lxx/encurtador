const bcrypt = require('bcrypt');

const User = require('../models/user');
const { log } = require('../util/log');

exports.createUser = async (req, res, next) => {
  let retries = 3;
  log('body createUser', () => {console.log(req.body)});
  const { name, email, password } = req.body;
  for (let i = 0; i < retries; i++) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      log("hashedPassword", () => console.log(hashed_password));
      const newUser = await User.create({
        name: name,
        email: email,
        password: hashedPassword
      });
      console.log(newUser);
      res.status(201).json({success: 'user created successfully!'});
    } catch (e) {
      log('error attempt', () => console.log(e));
    }
  }
  res.status(500).json({error: 'user not created!'});
}