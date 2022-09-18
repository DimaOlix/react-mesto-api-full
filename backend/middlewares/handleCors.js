const { allowedCors } = require('../utils/allowedCors');
const { DEFAULT_ALLOWED_METHODS } = require('../utils/DEFAULT_ALLOWED_METHODS');

// eslint-disable-next-line consistent-return
module.exports.handleCors = (req, res, next) => {
  const { method } = req;
  const { origin } = req.headers;
  const requestHeaders = req.headers['access-control-request-headers'];
  console.log(DEFAULT_ALLOWED_METHODS);


  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  next();
};
