import {accountsRepository} from '@/repositories';
import {accountsValidator} from '@/validators';

export default {
  login: async (payload) => {
    const validatedData = await accountsValidator.login.validateAsync(payload);
    const data = await accountsRepository.login(validatedData);
    return data;
  },
  detail: async (user) => {
    return user.toJSON();
  },
  logout: async (user) => {
    const data = await accountsRepository.logout(user);
    return data;
  },
};
