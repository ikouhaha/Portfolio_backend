const request = require('supertest')
const app = require('./common/index')
const userExpected = require("../docs/responseJson/user.json")
const breedDetailExpected = require("../docs/responseJson/breed.json")
const helper = require('./common/helper')




const expected = {
  "_id": "62612ee484cf2204c3b003a6",
  "email": "ikouhaha999@gmail.com",
  "password": "$2a$10$kJ898C4pVZyGY2mAnfFZi.B5i96ujHJFzcdPo23atGVfM0dBMolGu",
  "username": "ikouhaha999",
  "firstName": "Dennis",
  "lastName": "Au Yeung",
  "role": "staff",
  "companyCode": expect.any(String),
  "avatarUrl": expect.any(String),
  "googleId": expect.any(String),
  "dateRegistered": "2022-04-21T10:16:04.326Z",
  "favourites": expect.any(Object),
  "company": expect.any(Object),
  "id": 71
}

describe('Users Testing Cases',   () => {
  
  it('Return all users', async() => {
    const token = await helper.getLoginToken(request(app.callback()),"admin","123")
    console.log(token)
    //login with admin account , basic auth
    const res = await request(app.callback())
      .get('/api/v1/users')
      .set({ Authorization: token })
      .send({})
    
    expect(res.statusCode).toEqual(200)
    expect(res.type).toEqual("application/json")
    expect(res.body).toContainEqual(expected)
    
  })

  xit('get breed information by id', async() => {
    const res = await request(app.callback())
      .get('/api/v1/breeds/1')
      .send()
    expect(res.statusCode).toEqual(200)
    expect(res.type).toEqual("application/json")
    expect(res.body).toEqual(breedDetailExpected)
    
  })
  
})
