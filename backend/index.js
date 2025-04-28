require('dotenv').config();
const express = require('express');
const cors = require('cors');

const auth_middleware = require('./middleware/auth');

const encurtar_router = require('./routes/encurtar');
const account_router = require('./routes/account');

const sequelize = require('./database/database');
const User = require('./models/user');
const Link = require('./models/link');

const app = express();

app.use(cors());
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('./public/'));

app.use(auth_middleware);

app.use ('/account', account_router);
app.use('/', encurtar_router);

app.use('/', (req, res, next) => {
  res.redirect('/');
});

User.hasMany(Link);
Link.belongsTo(User);

// sequelize.sync({force: true})
sequelize.sync()
.then(_ => {
  console.log("======sequelize sync start================")
  app.listen(process.env.PORT, process.env.HOST, res => {
    console.log(`app listening on port: ${process.env.PORT}`)
  });
})
.then(_ => {
  console.log("======sequelize sync end==================")
})
.catch(err => {
  console.log(err);
})