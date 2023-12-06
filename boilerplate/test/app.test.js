const request = require('supertest');
const mongoose = require('mongoose');
// express app 
const { app } = require('../app/index');

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

describe('GET /', () => {
    it('API with status code 200', async () => {
      const response = await request(app).get('/v1');
      expect(response.statusCode).toBe(200);
    });
});
