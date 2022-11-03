const request = require('supertest');
const app = require('../server/index');

const GEONAMES_USERNAME = process.env.GEONAMES_USERNAME;

describe('Endpoints', () => {
    it('retrieve trip location coordinates ', async () => {
        const res = await request(app)
            .get('/locationCoordinates?destination=${destination}')
        expect(res.statusCode).toEqual(200)
    })
})
