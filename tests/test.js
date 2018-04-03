const request = require('supertest');
const setup = require('../server/db/index.js');
const { authDB } = require('../server/auth/models/user.js');
const utils = require('../utils/utils.js');

const { app } = require('../server/index.js');

beforeAll(async () => {
  await setup();
  await authDB.dropDatabase();
});

describe('Initial setup', () => {
  test('Successfully issue GET request to /', async () => {
    const response = await request(app).get('/');
    console.log('response is', response.headers);
    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toEqual(
      expect.stringContaining('text/html')
    );
  });
});

describe('Authentication', () => {
  test('Successfully create user on signup', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({
        username: 'testuser1',
        password: 'pw1'
      });
    expect(res.statusCode).toBe(200);
  });
});

describe('Utility functions', () => {
  test('convertTime properly converts date string to am/pm format', () => {
    expect(utils.convertTime('2018-04-09 12:38:02')).toBe(
      'Mon Apr 09, 2018 12:38 pm'
    );
    expect(utils.convertTime('2018-04-09 00:00:00')).toBe(
      'Mon Apr 09, 2018 12:00 am'
    );
  });
});
