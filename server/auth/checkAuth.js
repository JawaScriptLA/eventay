const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, 'mySecret');
    req.decoded = decoded;
    next();
  } catch (err) {
    console.log('check auth!');
    return res.status(401).end();
  }
};
