const request = require('supertest');
const app = require('../../src/app');

describe('Test launches',()=>{
    it('Get all launches', async ()=>{
        jest.setTimeout(30000);
        const response = await request(app)
            .get('/launches')
        expect(response.statusCode).toBe(200);
    });
    it('Add New Launch not value', async ()=>{
        jest.setTimeout(30000);
        const response = await request(app)
            .post('/launches')
        expect(response.statusCode).toBe(400);
    });

    it('Add New Launch have value but the launch date not valid', async ()=>{
        jest.setTimeout(30000);
        const response = await request(app)
            .post('/launches')
            .send({mission: 'aa', rocket:'b', launchDate:'not valid', target:'diem'})
        expect(response.statusCode).toBe(400);
    });

    it('Add New Launch have value valid', async ()=>{
        jest.setTimeout(30000);
        const response = await request(app)
            .post('/launches')
            .send({mission: 'aa', rocket:'b', launchDate: Date.now(), target:'diem'})
        expect(response.statusCode).toBe(201);
    })

    it('Delete Launch exist', async ()=>{
        jest.setTimeout(30000);
        const response = await request(app)
            .delete('/launches/100')
        expect(response.statusCode).toBe(200);
    })

    it('Delete Launch not exist', async ()=>{
        jest.setTimeout(30000);
        const response = await request(app)
            .delete('/launches/100000')
        expect(response.statusCode).toBe(404);
    })
})
