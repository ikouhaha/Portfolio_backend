const request = require('supertest')
const app = require('./common/index')

const expected = {
  "_id": {
      "$oid": "6260cf6058cfd96a0e70bc25"
  },
  "bred_for": "A wild pack animal",
  "height": {
      "imperial": "30",
      "metric": "76"
  },
  "id": 3,
  "image": {
      "height": 335,
      "id": "rkiByec47",
      "url": "https://cdn2.thedogapi.com/images/rkiByec47.jpg",
      "width": 500
  },
  "life_span": "11 years",
  "name": "African Hunting Dog",
  "origin": "",
  "reference_image_id": "rkiByec47",
  "temperament": "Wild, Hardworking, Dutiful",
  "weight": {
      "imperial": "44 - 66",
      "metric": "20 - 30"
  }
}

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
