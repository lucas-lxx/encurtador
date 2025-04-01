exports.getIndex = (req, res, next) => {
  res.render('index');
};

exports.createShortLink = (req, res, next) => {
  console.log(req.body);
  res.redirect('/link/success');
};

exports.createLinkSuccess = (req, res, next) => {
  res.send('success!');
}