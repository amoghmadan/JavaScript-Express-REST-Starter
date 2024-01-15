import 'dotenv/config';
import mongoose from 'mongoose';
import supertest from 'supertest';

import {getRequestListener} from '../src/cli/bootstrap';
import {User} from '../src/models';
import {MONGODB_URI} from '../src/settings';
import {generateKey} from '../src/utilities/token';

const ROOT_URL = '/api/accounts';
const KEYWORD = 'Token';
const EMAIL = 'account.testuser@email.com';
const CREDENTIALS = {email: EMAIL, password: 'foobarbaz'};

const request = supertest(getRequestListener());

describe('Account API Tests', () => {
  beforeAll(async () => {
    await mongoose.connect(MONGODB_URI);
    await User.create({
      ...CREDENTIALS,
      firstName: 'Account',
      lastName: 'Test User',
    });
  });

  afterAll(async () => {
    await User.deleteOne({email: EMAIL});
    await mongoose.connection.close();
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
      const user = await User.findOne({email: EMAIL});
      user.token = {key: generateKey()};
      await user.save();

      const response = await request
          .get(`${ROOT_URL}/detail`)
          .set('Authorization', `${KEYWORD} ${user.token.key}`);

      expect(response.status).toBe(200);
      expect(response.body.email).toBe(user.email);
      expect(response.body.firstName).toBe(user.firstName);
      expect(response.body.lastName).toBe(user.lastName);
    });

    it('Returns 401 if not authorized', async () => {
      const response = await request.get(`${ROOT_URL}/detail`);
      expect(response.status).toBe(401);
    });
  });

  describe(`DELETE ${ROOT_URL}/logout`, () => {
    it('Performs Account Logout', async () => {
      const user = await User.findOne({email: EMAIL});
      user.token = {key: generateKey()};
      await user.save();

      const response = await request
          .delete(`${ROOT_URL}/logout`)
          .set('Authorization', `${KEYWORD} ${user.token.key}`);
      expect(response.status).toBe(204);
    });

    it('Returns 401 if not authorized', async () => {
      const response = await request.delete(`${ROOT_URL}/logout`);
      expect(response.status).toBe(401);
    });
  });
});
