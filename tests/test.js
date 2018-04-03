const request = require('supertest');
const setup = require('../server/db/index.js');
const { authDB } = require('../server/auth/models/user.js');

const { app } = require('../server/index.js');

beforeAll(async () => {
  await setup();
  await authDB.dropDatabase();
});

describe('GET /', () => {
  test('GET method renders 200 status code', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });

  test('successfully hit the signup route', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({
        username: 'bobb',
        password: 'hey'
      });
    expect(res.statusCode).toBe(200);
  });
});

afterAll(() => {
  console.log('Test suite completed');
});
