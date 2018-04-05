const request = require('supertest');
const setup = require('../server/db/index.js');
const { authDB } = require('../server/auth/db.js');

const { app } = require('../server/index.js');

beforeAll(async () => {
  await setup();
});

describe('Initialization', () => {
  test('Successfully issue GET request to /', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toEqual(
      expect.stringContaining('text/html')
    );
  });
  test('Render home page for unknown route', async () => {
    const res = await request(app).get('/unknownPage');
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toEqual('text/html; charset=UTF-8');
    const expectedContentLength = '448';
    expect(res.headers['content-length']).toEqual(expectedContentLength);
  });
});
