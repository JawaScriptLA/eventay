const request = require('supertest');
const setup = require('../server/db/index.js');
const { authDB } = require('../server/auth/models/user.js');

const { app } = require('../server/index.js');

const auth = {};
beforeAll(async () => {
  await authDB.dropDatabase();
  await setup();
  const res = await request(app)
    .post('/api/auth/signup')
    .send({
      username: 'testuser1',
      password: 'pw1'
    });
  auth.token = res.body.token;

  await request(app)
    .post('/api/auth/signup')
    .send({
      username: 'testuser1',
      password: 'pw1'
    });

  // await request(app)
  //   .post('/api/event')
  //   .send({ title: 'event1' });

  // add token to header

  // title,
  //   description,
  //   thumbnail,
  //   location,
  //   start_time,
  //   end_time,
  //   publicity,
  //   host_id;

  // store the token in auth for each test to use
  // create a user
  // create an event
});

test('hi', () => {});

// describe('Posts', () => {
//   test('Successfully create a post', async () => {
//     // console.log('!!!', auth);
//     //     const res = await request(app)
//     //       .post('/api/post')
//     //       .send({
//     //         body: 'post1',
//     //         user_id: 1,
//     //         event_id: 1
//     //       });
//     //     // expect(res.statusCode).toBe(200);
//   });
// });
