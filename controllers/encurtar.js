const path = require('path');
const { nanoid } = require('nanoid');

const Link = require('../models/link');

exports.getIndex = (req, res, next) => {
  res.render('index');
};

exports.createShortLink = (req, res, next) => {
  const originalLink = req.body.originalLink;
  Link.findOne({where: {original_link: originalLink}})
  .then(data => {
    const randomPath = nanoid(7);
    const shortLinkName = path.join(process.env.URL, randomPath);
    console.log("originalLink: ", originalLink);
    console.log("shortLink: ", shortLinkName);
    return Link.create({
      original_link: originalLink,
      short_link: shortLinkName,
      last_click: null,
      clicks: 0
    })
  })
  .then(shortLink => {
    console.log("short obj", shortLink);
    res.json({link: shortLink.short_link});
  })
  .catch(err => {console.error(err); res.json({link: 'server error: function createShortLink()'})});
};

exports.createLinkSuccess = (req, res, next) => {
  res.send({link: 'success'});
}