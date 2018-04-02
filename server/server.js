const { app } = require('./index.js');

const port = 1337;
app.listen(port, () => {
  console.log('Listening in port', port);
});
