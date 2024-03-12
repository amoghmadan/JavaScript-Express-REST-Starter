import supertest from 'supertest';

import {getRequestListener} from '@/cli/bootstrap';
import db from '@/models';
import {generateKey} from '@/utils/token';

const ROOT_URL = '/api/accounts';
const KEYWORD = 'Token';
const EMAIL = 'account.testuser@email.com';
const CREDENTIALS = {email: EMAIL, password: 'foobarbaz'};

const request = supertest(getRequestListener());

describe('Account API Tests', () => {
  beforeAll(async () => {
    await db.User.create({
      ...CREDENTIALS,
      firstName: 'Account',
      lastName: 'Test User',
    });
  });

  afterAll(async () => {
    const user = await db.User.findOne({where: {email: EMAIL}});
    await user.destroy();
  });

  describe(`POST ${ROOT_URL}/login`, () => {
    it('Incomplete Payload', async () => {
      const response = await request
          .post(`${ROOT_URL}/login`)
          .send({email: EMAIL});
      expect(response.status).toBe(400);
    });
  });

  describe(`POST ${ROOT_URL}/login`, () => {
    it('Invalid Credentials', async () => {
      const response = await request
          .post(`${ROOT_URL}/login`)
          .send({email: EMAIL, password: 'foobarba'});
      expect(response.status).toBe(401);
    });
  });

  describe(`POST ${ROOT_URL}/login`, () => {
    it('Performs Account Login', async () => {
      const response = await request
          .post(`${ROOT_URL}/login`)
          .send(CREDENTIALS);
      expect(response.status).toBe(201);
      expect(response.body.token).toBeDefined();
    });
  });

  describe(`GET ${ROOT_URL}/detail`, () => {
    it('Retrieves Account Details', async () => {
      const user = await db.User.findOne({where: {email: EMAIL}});
      let token = await db.Token.findOne({where: {userId: user.id}});
      if (!token) {
        token = await db.Token.create({
          userId: user.id,
          key: generateKey(),
        });
      }

      const response = await request
          .get(`${ROOT_URL}/detail`)
          .set('Authorization', `${KEYWORD} ${token.key}`);

      expect(response.status).toBe(200);
      expect(response.body.email).toBe(user.email);
      expect(response.body.firstName).toBe(user.firstName);
      expect(response.body.lastName).toBe(user.lastName);
    });

    it('Returns 401 if not authorized', async () => {
      const response = await request.get(`${ROOT_URL}/detail`);
      expect(response.status).toBe(401);
    });

    it('Returns 401 if Bearer instead of Token', async () => {
      const response = await request
          .get(`${ROOT_URL}/detail`)
          .set('Authorization', 'Bearer Token');
      expect(response.status).toBe(401);
    });

    it('Returns 401 if more than two value', async () => {
      const response = await request
          .get(`${ROOT_URL}/detail`)
          .set('Authorization', 'This Bearer Token');
      expect(response.status).toBe(401);
    });

    it('Returns 403 if invalid token', async () => {
      const response = await request
          .get(`${ROOT_URL}/detail`)
          .set('Authorization', 'Token 0X1X2X3X4X5X6X7X8X');
      expect(response.status).toBe(403);
    });
  });

  describe(`DELETE ${ROOT_URL}/logout`, () => {
    it('Performs Account Logout', async () => {
      const user = await db.User.findOne({where: {email: EMAIL}});
      let token = await db.Token.findOne({where: {userId: user.id}});
      if (!token) {
        token = await db.Token.create({
          userId: user.id,
          key: generateKey(),
        });
      }

      const response = await request
          .delete(`${ROOT_URL}/logout`)
          .set('Authorization', `${KEYWORD} ${token.key}`);
      expect(response.status).toBe(204);
    });
  });
});
