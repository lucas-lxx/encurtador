exports.getShortLinkName = (shortLinkId) => {
  return process.env.SHORT_LINK_URL + "/" + shortLinkId;
}