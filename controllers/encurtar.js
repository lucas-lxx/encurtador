const { nanoid } = require('nanoid');

const { getShortLinkName } = require('../util/url');
const Link = require('../models/link');

exports.getIndex = async (req, res, next) => {
  res.render('index');
};

exports.createShortLink = async (req, res, next) => {
  const originalLink = req.body.originalLink;
  Link.findAll({where: {original_link: originalLink}})
  .then(data => {
    const shortLinkId = nanoid(7);
    const shortLinkName = getShortLinkName(shortLinkId);
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

exports.getShortLink = async (req, res, next) => {
  const shortLinkName = getShortLinkName(req.params.short_link_id);
  Link.findByPk(shortLinkName)
  .then(link => {
    link.last_click = new Date();
    link.clicks += 1;
    link.save();
    res.redirect(link.original_link);
  })
  .catch(err => console.error(err));
}