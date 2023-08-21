const request = require('supertest');
const { faker } = require('@faker-js/faker');

const { APP_BASE_URL } = require('../config/test.config');

const DB = {};

describe('POST User - Create new user /user', () => {
    test('should return 200 status code', async () => {
        const payload = {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: faker.string.alphanumeric()
        }
        const response = await request(APP_BASE_URL).post('/user')
        .send(payload);
        expect(response.statusCode).toBe(200);
        DB.user = response.body.data;
    });
});

describe('GET Users List /user/list', () => {
    test('should return 200 status code', async () => {
        const response = await request(APP_BASE_URL).get('/user/list');
        expect(response.statusCode).toBe(200);
        expect(response.body.status).toEqual(true);
    });
});

describe('GET Users by _id /user/:id', () => {
    test('should return 200 status code', async () => {
        const response = await request(APP_BASE_URL).get('/user/'+DB.user._id);
        expect(response.statusCode).toBe(200);
        expect(response.body.status).toEqual(true);
    });
});

describe('PUT User - Update user details /user', () => {
    test('should return 200 status code', async () => {
        const payload = {
            name: faker.person.fullName()
        }
        const response = await request(APP_BASE_URL).put('/user/'+DB.user._id)
        .send(payload);
        expect(response.statusCode).toBe(200);
        expect(response.body.data.name).toBe(payload.name);
    });
});

describe('DELETE User - Delete user /user', () => {
    test('should return 200 status code', async () => {
        const response = await request(APP_BASE_URL).delete('/user/'+DB.user._id)
        .send({});
        expect(response.statusCode).toBe(200);
    });
});