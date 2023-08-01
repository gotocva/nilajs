const boot = require('easy-alias/boot')
const request = require('supertest');
const { mongooseConnection, application } = require('../dist/index');

describe('GET /api/v1', () => {
  test('should return 200 status code', async () => {
    const response = await request(application).get('/api');
    expect(response.statusCode).toBe(200);
    // expect(response.body.users).toHaveLength(3);
    // expect(response.body.users).toEqual(['John', 'Jane', 'Alice']);
  });
});
