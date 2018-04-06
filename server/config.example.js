module.exports = {
  rdb: {
    environment: 'test',
    user: 'root',
    host: 'localhost',
    name_dev: 'eventayRDB',
    name_testing: 'testingEventayRDB',
    password: '',
    port: 5432
  },
  auth: {
    uri_dev: 'mongodb://localhost/eventay',
    uri_testing: 'mongodb://localhost/eventayTesting'
  }
};
