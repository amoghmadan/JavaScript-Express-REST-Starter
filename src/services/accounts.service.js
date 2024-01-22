import {accountsRepository} from '@/repositories';
import {accountsValidator} from '@/validators';

export default {
  login: async (payload) => {
    const validatedData = await accountsValidator.login.validateAsync(payload);
    const data = await accountsRepository.login(validatedData);
    return data;
  },
  detail: async (user) => {
    const detail = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isAdmin: user.isAdmin,
      dateJoined: user.dateJoined,
    };
    return detail;
  },
  logout: async (user) => {
    const data = await accountsRepository.logout(user);
    return data;
  },
};
