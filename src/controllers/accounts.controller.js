import {ValidationError} from 'joi';

import {accountsService} from '@/services';

export default {
  login: async (request, response) => {
    try {
      const data = await accountsService.login(request.body);
      if (!data) {
        return response.status(401).json({detail: 'Invalid credentials!'});
      }
      return response.status(201).json(data);
    } catch (err) {
      if (err instanceof ValidationError) {
        return response.status(400).json(err.details);
      }
      return response.status(500).json(err);
    }
  },
  detail: async (request, response) => {
    const data = await accountsService.detail(request.user);
    return response.status(200).json(data);
  },
  logout: async (request, response) => {
    try {
      const data = await accountsService.logout(request.user);
      return response.status(204).json(data);
    } catch (err) {
      return response.status(500).json(err);
    }
  },
};
