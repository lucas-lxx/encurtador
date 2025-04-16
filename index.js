require('dotenv').config();
const express = require('express');

const encurtar_router = require('./routes/encurtar');
const sequelize = require('./database/database');

const User = require('./models/user');
const Link = require('./models/link');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('./public/'));

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