const request = require('supertest');
const app = require('../../src/app');

describe('Test planets',()=>{
    it('Get all planets', async ()=>{
        jest.setTimeout(30000);
        const response = await request(app)
            .get('/planets')
        expect(response.statusCode).toBe(200);
    })
})