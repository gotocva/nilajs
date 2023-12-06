const request = require('supertest');
const mongoose = require('mongoose');
// express app 
const app = require('../src/app');
// Use an in-memory MongoDB server for testing
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;
/**
 * before running test
 */
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = await mongoServer.getUri();
  await mongoose.connect(mongoUri, {});
});
/**
 * After running all test's
 */
afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('POST /v1/admin/login', () => {

  it('login with wrong password - bad request', async () => {
    const userData = { password: 'John Doe', email: 'john@example.com' };
    const response = await request(app).post('/v1/admin/login').send(userData);
    expect(response.statusCode).toBe(400);
    expect(response.body.status).toBe(false);
  });

});