const { nanoid } = require('nanoid');

const { getShortLinkName } = require('../util/url');
const Link = require('../models/link');

exports.getIndex = async (req, res, next) => {
  res.render('index');
};

exports.createShortLink = async (req, res, next, tryy = null) => {
  if (!tryy) tryy = 3;
  const originalLink = req.body.original_link;
  const shortLinkId = nanoid(7);
  const shortLinkName = getShortLinkName(shortLinkId);
  try {
    const link = await Link.create({
      original_link: originalLink,
      short_link: shortLinkName,
      last_click: null,
      clicks: 0
    });
    res.json({link: link.short_link});
  } catch (e) {
    console.error(e);
    if (tryy <= 0) res.status(500).json({error: 'Internal server error'});
    if (e.name === 'SequelizeUniqueConstraintError') {
      this.createShortLink(req, res, next, (tryy-1));
    }
  }
};

exports.getShortLink = async (req, res, next) => {
  const shortLinkName = getShortLinkName(req.params.short_link_id);
  try {
    const link = await Link.findByPk(shortLinkName);
    link.last_click = new Date();
    link.clicks += 1;
    link.save();
    res.redirect(link.original_link);
  } catch (e) {
    console.log(e);
    res.status(500).json({error: 'Internal server error'});
  }
}