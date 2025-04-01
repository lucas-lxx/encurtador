const express = require('express');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('./public/'));

app.use('/', (req, res, next) => {
  res.render('index');
});

app.listen(process.env.PORT, process.env.HOST, res => {
  console.log(`app listening on port: ${process.env.PORT}`)
});