const request = require('supertest')
const app = require('./common/index')
const helper = require('./common/helper')


const randomName = () => (Math.random() + 1).toString(36).substring(7)


const expected = {
  "_id": "62681ec3a690ed84f53fe15f",
  "name": expect.any(String),
  "about": expect.any(String),
  "breedID": expect.any(Number),
  "imageBase64": expect.any(String),
  "createdBy": 71,
  "companyCode": "7df96371-eac9-40b2-a734-1cf4a8ba433f",
  "id": 87,
  "breed": expect.any(Object),
  "createBy": expect.any(Object)
}

const expectedInner = {
  "_id": "62681ec3a690ed84f53fe15f",
  "name": expect.any(String),
  "about": expect.any(String),
  "breedID": expect.any(Number),
  "imageBase64": expect.any(String),
  "createdBy": 71,
  "companyCode": "7df96371-eac9-40b2-a734-1cf4a8ba433f",
  "id": 87,
  "breed": expect.any(Object),
  "createBy": expect.any(Object),
  "comments": expect.any(Array)
}



describe('Dogs Testing Cases', () => {

  it('Return all dogs', async () => {
    //login with admin account , basic auth
    const res = await request(app.callback())
      .get('/api/v1/dogs?page=1&limit=10')      
      .send({})

    expect(res.statusCode).toEqual(200)
    expect(res.type).toEqual("application/json")
    expect(res.body.canCreate).toEqual(false)
    expect(res.body.totalCount).toEqual(expect.any(Number))
    expect(res.body.list.length).toBeLessThan(11)
    expect(res.body.list).toContainEqual(expected)

  })

  it('Return all dogs and test staff action', async () => {
    const token = await helper.getLoginToken(request(app.callback()), "ikouhaha999", "123")
    //login with admin account , basic auth
    const res = await request(app.callback())
      .get('/api/v1/dogs?page=1&limit=10')    
      .set({ Authorization: token })   
      .send({})

    expect(res.statusCode).toEqual(200)
    expect(res.type).toEqual("application/json")
    expect(res.body.canCreate).toEqual(true)
    expect(res.body.totalCount).toEqual(expect.any(Number))
    expect(res.body.list.length).toBeLessThan(11)
    const newExpect = {...expected,canUpdate:true,canDelete:true,"isFavourite": expect.any(Boolean)}
    expect(res.body.list).toContainEqual(newExpect)

  })

  it('Return the specified dogs', async () => {
    const res = await request(app.callback())
      .get('/api/v1/dogs/87')      
      .send({})

    expect(res.statusCode).toEqual(200)
    expect(res.type).toEqual("application/json")
    expect(res.body).toEqual(expectedInner)

  })

  it('Return the specified dogs and test staff action', async () => {
    const token = await helper.getLoginToken(request(app.callback()), "ikouhaha999", "123")
    const res = await request(app.callback())
      .get('/api/v1/dogs/87')     
      .set({ Authorization: token }) 
      .send({})
    //ensure the staff have permission to edit
    expect(res.statusCode).toEqual(200)
    expect(res.type).toEqual("application/json")
    const newExpect = {...expectedInner,canUpdate:true,canDelete:true,"isFavourite": expect.any(Boolean)}
    expect(res.body).toEqual(newExpect)

  })

  it("create a new dog", async () => {
    const token = await helper.getLoginToken(request(app.callback()), "ikouhaha999", "123")
    console.log('token', token)
    const res = await request(app.callback())
      .post('/api/v1/dogs')
      .set({ Authorization: token })
      .send({
        "name":"test",
        "about":"test",
        "imageBase64":"data:image/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPMSkkxBgAD2QFnQD1bxwAAAABJRU5ErkJggg==",
        "breedID":1,
        "createdBy":71,//staff id
        "companyCode":"7df96371-eac9-40b2-a734-1cf4a8ba433f"
      })

    expect(res.statusCode).toEqual(201)
    expect(res.type).toEqual("application/json")
  })

  it("update the dog's information", async () => {
    const token = await helper.getLoginToken(request(app.callback()), "ikouhaha999", "123")
    console.log('token', token)
    const res = await request(app.callback())
      .put('/api/v1/dogs/37')
      .set({ Authorization: token })
      .send({
        "name":"test",
        "about":"test update dog's information",
        "imageBase64":"data:image/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPMSkkxBgAD2QFnQD1bxwAAAABJRU5ErkJggg==",
        "breedID":1,
        "createdBy":71,//staff id
        "companyCode":"7df96371-eac9-40b2-a734-1cf4a8ba433f"
      })

    expect(res.statusCode).toEqual(201)
    expect(res.type).toEqual("application/json")
  })

  it("delete the dog", async () => {
    const token = await helper.getLoginToken(request(app.callback()), "ikouhaha999", "123")
    console.log('token', token)
    const res = await request(app.callback())
      .delete('/api/v1/dogs/38')
      .set({ Authorization: token })
      .send({})

    expect(res.statusCode).toEqual(201)
    expect(res.type).toEqual("application/json")
  })

  xit("change user's profile", async () => {
    const token = await helper.getLoginToken(request(app.callback()), "ikouhaha999", "123")

    const res = await request(app.callback())
      .put('/api/v1/users/71')
      .set({ Authorization: token })
      .send({ firstName: "Dennis test123", username: "ikouhaha999", companyCode: "7df96371-eac9-40b2-a734-1cf4a8ba433f", email: "ikouhaha999@gmail.com", "role": "staff" })

    expect(res.statusCode).toEqual(201)
    expect(res.type).toEqual("application/json")


  })


  it("change user's pwd", async () => {
    const token = await helper.getLoginToken(request(app.callback()), "ikouhaha999", "123")

    const res = await request(app.callback())
      .put('/api/v1/users/p/71')
      .set({ Authorization: token })
      .send({ password: "123" })

    expect(res.statusCode).toEqual(201)
    expect(res.type).toEqual("application/json")


  })

  xit("Connect with google test", async () => {
    const token = await helper.getLoginToken(request(app.callback()), "ikouhaha999", "123")

    const res = await request(app.callback())
      .put('/api/v1/users/connect/71')
      .set({ Authorization: token })
      .send({ avatarUrl: "https://lh3.googleusercontent.com/a/AATXAJwx1Xg_pxBWwoCNbG_u-lvz24ZLjtZxpFoBVTZt=s96-c", googleId: parseInt(Math.random() * 99999999999).toString() }) //mockgoogleid

    expect(res.statusCode).toEqual(201)
    expect(res.type).toEqual("application/json")


  })



  xit('create a new users', async () => {

    //public user register
    const res = await request(app.callback())
      .post('/api/v1/users')
      .send({
        "email": randomName() + "@example.com",
        "password": "123",
        "username": randomName(),
        "firstName": "",
        "lastName": "",
        "role": "user",
        "companyCode": "",
      })

    expect(res.statusCode).toEqual(201)
    expect(res.type).toEqual("application/json")


  })

  xit('create a new staff', async () => {

    //public user register
    const res = await request(app.callback())
      .post('/api/v1/users')
      .send({
        "email": randomName() + "@example.com",
        "password": "123",
        "username": randomName(),
        "firstName": "",
        "lastName": "",
        "role": "staff",
        "companyCode": "7df96371-eac9-40b2-a734-1cf4a8ba433f",
      })

    expect(res.statusCode).toEqual(201)
    expect(res.type).toEqual("application/json")


  })

})
