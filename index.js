const express = require('express');

const encurtar_router = require('./routes/encurtar');

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

app.listen(process.env.PORT, process.env.HOST, res => {
  console.log(`app listening on port: ${process.env.PORT}`)
});