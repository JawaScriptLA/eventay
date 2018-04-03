const setup = require('./index.js');

const clearDB = async () => {
  await setup();
  process.exit();
};
clearDB();
