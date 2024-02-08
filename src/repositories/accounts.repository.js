import {User} from '@/models';
import {generateKey} from '@/utils/token';

export default {
  login: async (payload) => {
    const user = await User.findOne({email: payload.email, isActive: true});
    if (!user) return null;
    const match = await user.validatePassword(payload.password);
    if (!match) return null;
    if (!user.token) {
      user.token = {key: generateKey()};
      user.lastLogin = new Date();
      await user.save();
    }
    return {token: user.token.key};
  },
  logout: async (user) => {
    user.set('token', undefined, {strict: false});
    await user.save();
  },
};
