const INTERNAL_SERVER_ERROR = 500;

const LINK = /^(?:(ftp|http|https):\/\/)?(?:[a-zA-Z]+\.){0,1}(?:[a-zA-Z0-9][a-zA-Z0-9-]+){1}(?:\.[a-zA-Z]{2,6})?(\/|\/\w\S*)?$/;

module.exports = {
  INTERNAL_SERVER_ERROR,
  LINK,
};
