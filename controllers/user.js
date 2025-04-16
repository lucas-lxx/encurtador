const bcrypt = require('bcrypt');

const User = require('../models/user');
const { log } = require('../util/log');

exports.createUser = async (req, res, next) => {
  let retries = 3;
  log('body createUser', () => {console.log(req.body)});
  const { name, email, password } = req.body;
  for (let i = 0; i < retries; i++) {
    try {
      const hashed_password = await bcrypt.hash(password, 10);
      log("hashed_password", () => console.log(hashed_password));
      const new_user = await User.create({
        name: name,
        email: email,
        password: hashed_password
      });
      console.log(new_user);
      res.json({success: 'user created successfully!'});
    } catch (e) {
      log('error attempt', () => console.log(e));
    }
  }
  res.status(500).json({error: 'user not created!'});
}