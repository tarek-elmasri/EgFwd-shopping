import supertest from 'supertest';
import { app } from '../../server';

const request = supertest(app);

describe('/users routes endpoints tests', () => {
  const newUserParams = {
    username: 'mosalah',
    firstName: 'mo',
    lastName: 'salah',
    password: '12345',
  };

  const userCredentials = {
    username: 'mosalah',
    password: '12345',
  };

  it('/users [GET] 200 with users list response', async () => {
    const res = await request.get('/users');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('/users [POST] 201 with user object and token response', async () => {
    const res = await request.post('/users').send(newUserParams);
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.username).toEqual(newUserParams.username);
    expect(res.body.firstName).toBeTruthy();
    expect(res.body.token).toBeTruthy();
    expect(res.body.password).toBeFalsy();
    expect(res.body.password_digest).toBeFalsy();
  });

  it('/users [POST] 400 with missing params', async () => {
    const res = await request.post('/users');
    expect(res.status).toBe(400);
  });

  it('/users [POST] 400 with invalid params', async () => {
    const res = await request
      .post('/users')
      .send({ ...newUserParams, username: 500 });
    expect(res.status).toBe(400);
  });

  it('/users/auth [POST] 200 with user object response', async () => {
    const res = await request.post('/users/auth').send(userCredentials);
    expect(res.status).toBe(200);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toEqual(newUserParams.firstName);
    expect(res.body.username).toBeTruthy();
    expect(res.body.password).toBeFalsy();
    expect(res.body.password_digest).toBeFalsy();
  });

  it('/users/auth [POST] 400 if missing credetials', async () => {
    const res = await request.post('/users/auth');
    expect(res.status).toBe(400);
  });

  it('/users/auth [POST] 404 with invalid credentials', async () => {
    const res = await request
      .post('/users/auth')
      .send({ username: 'unknown', password: 'unknown' });

    expect(res.status).toBe(404);
  });
});
