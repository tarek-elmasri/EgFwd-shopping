import supertest from 'supertest';
import { app } from '../../server';

const request = supertest(app);

const getToken = async (): Promise<string> => {
  const credentials = { username: 'leomessi', password: '12345' };
  const res = await request.post('/users/auth').send(credentials);
  return res.body.token;
};
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

  it('/users [GET] 401 with no token procided', async () => {
    const res = await request.get('/users');
    expect(res.statusCode).toBe(401);
  });

  it('/users [GET] 200 with users list response', async () => {
    const res = await request
      .get('/users')
      .set('Authorization', 'Bearer ' + (await getToken()));

    expect(res.status).toBe(200);
    expect(res.body instanceof Array).toBeTrue();
    expect(res.body.length).toBeGreaterThanOrEqual(2);
  });

  it('/users/:id [GET] 401 with no auth headers', async () => {
    const res = await request.get('/users/1');
    expect(res.statusCode).toBe(401);
  });

  it('/users/id [GET] 200 with required user object', async () => {
    const res = await request
      .get('/users/1')
      .set('Authorization', 'Bearer ' + (await getToken()));

    expect(res.status).toBe(200);
    expect(res.body.id).toBeDefined();
    expect(res.body.username).toBeDefined();
    expect(res.body.firstName).toBeDefined();
  });

  it('/users [POST] 201 with user object and token response', async () => {
    const res = await request.post('/users').send(newUserParams);
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.username).toEqual(newUserParams.username);
    expect(res.body.firstName).toBeDefined();
    expect(res.body.token).toBeDefined();
    expect(res.body.password).toBeFalsy();
    expect(res.body.password_digest).toBeFalsy();
  });

  it('/users [POST] 400 with missing params', async () => {
    const res = await request.post('/users');
    expect(res.status).toBe(400);
    expect(res.body.errors).toBeDefined();
    expect(res.body.message).toBeDefined();
  });

  it('/users [POST] 400 with invalid params', async () => {
    const res = await request
      .post('/users')
      .send({ ...newUserParams, username: 500 });
    expect(res.status).toBe(400);
    expect(res.body.errors).toBeDefined();
    expect(res.body.message).toBeDefined();
  });

  it('/users/auth [POST] 200 with user object response', async () => {
    const res = await request.post('/users/auth').send(userCredentials);
    expect(res.status).toBe(200);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toEqual(newUserParams.firstName);
    expect(res.body.username).toEqual(newUserParams.username);
    expect(res.body.password).toBeFalsy();
    expect(res.body.password_digest).toBeFalsy();
  });

  it('/users/auth [POST] 400 if missing credetials', async () => {
    const res = await request.post('/users/auth');
    expect(res.status).toBe(400);
    expect(res.body.message).toBeDefined();
    expect(res.body.errors).toBeDefined();
  });

  it('/users/auth [POST] 404 with invalid credentials', async () => {
    const res = await request
      .post('/users/auth')
      .send({ username: 'unknown', password: 'unknown' });

    expect(res.status).toBe(404);
  });
});
