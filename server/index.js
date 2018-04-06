const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const router = require('./router.js');
const app = express();
const authDb = require('./auth/db.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use('/', express.static(path.join(__dirname, '/../client/public/')));

/* Start auth*/
const passportObj = require('passport');
const flash = require('connect-flash');
app.use(flash());
app.use(passportObj.initialize());
app.use(passportObj.session());
const initPassport = require('./auth/init.js');
initPassport(passportObj);
/*End auth*/

app.use('/api', router(passportObj));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/public/index.html'), err => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

// const port = 1337;
// app.listen(port, () => {
//   console.log('Listening in port', port);
// });

module.exports.passportObj = passportObj;
module.exports.app = app;
