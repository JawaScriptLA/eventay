const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const router = require('./router.js');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static(path.join(__dirname, '/../client/public/')));
app.use('/api/', router);

app.use(morgan('tiny'));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '/../client/public/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  });
});

const port = 1337;

app.listen(port, () => {
  console.log('Listening in port', port);
});