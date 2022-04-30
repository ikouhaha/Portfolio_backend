const request = require('supertest')
const app = require('./common/index')

const expected = {"_id": "American Foxhound", "id": 14, "name": "American Foxhound"}

describe('Breeds Testing Cases', () => {
  it('Return all breeds', async() => {
    const res = await request(app.callback())
      .get('/api/v1/breeds')
      .send({})
    expect(res.statusCode).toEqual(200)
    expect(res.type).toEqual("application/json")
    expect(res.body).toContainEqual(expected)
    
  })
  
})
