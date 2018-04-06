const request = require('supertest');
const setup = require('../server/db/index.js');

const { app } = require('../server/index.js');

beforeAll(async () => {
  await setup();
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

  test('Creating duplicate user triggers error', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({
        username: 'testuser1',
        password: 'pw1'
      });
    expect(res.statusCode).toBe(401);
  });

  test('Successfully return user upon login', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'testuser1',
        password: 'pw1'
      });
    expect(res.body.userInfo.username).toBe('testuser1');
  });

  test('Entering nonexistent user triggers error', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'nonExistentUser',
        password: ''
      });
    expect(res.statusCode).toBe(401);
  });

  test('Entering incorrect password triggers error', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'testuser1',
        password: 'wrongPassword'
      });
    expect(res.statusCode).toBe(401);
  });

  test('Accessing protected route without token is unsuccessful', async () => {
    const res = await request(app).get('/api/friends/1');
    expect(res.statusCode).toBe(401);
  });

  test('Post to /api/auth/logout successfully logs out user', async () => {
    const res = await request(app).post('/api/auth/logout');
    expect(res.statusCode).toBe(200);
  });
});
