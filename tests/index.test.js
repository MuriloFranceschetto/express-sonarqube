const request = require('supertest');
const server = require('../src/app');
const app = require('../src/app')

describe('Post Endpoints', () => {
  it('should create a new post', async () => {
    const res = await request(app)
    .get('/')
    .send({
      userId: 1,
      title: 'test is cool',
    })
    expect(res.statusCode).toEqual(200)
  })
});