import request from 'supertest'
import { app } from '../../app'

it('fails when an email does not exist is supplied', async() => {
    return request(app)
    .post('/api/users/signin')
    .send({
        email: 'test@test.com',
        password: 'password'
    })
    .expect(400)
})

it('fails when an supplied email and password are incorrect from signup', async() => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'test'
        })
        .expect(201)
    
    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: 'boombah'
        })
        .expect(400)
})

it('fails when a cookie is not set', async() => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'test'
        })
        .expect(201)
    
    const response = await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: 'test'
        })
        .expect(200)

    expect(response.get('Set-Cookie')).toBeDefined()
})