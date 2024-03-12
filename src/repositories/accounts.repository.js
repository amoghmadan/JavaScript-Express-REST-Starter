import db from '@/models';
import {generateKey} from '@/utils/token';

export default {
  login: async (payload) => {
    const user = await db.User.findOne({
      where: {email: payload.email, isActive: true},
    });
    if (!user) return null;
    const match = await user.checkPassword(payload.password);
    if (!match) return null;
    let token = await db.Token.findOne({where: {userId: user.id}});
    if (!token) {
      token = await db.Token.create({userId: user.id, key: generateKey()});
      user.lastLogin = token.created;
      await user.save();
    }
    return token.toJSON();
  },
  logout: async (user) => {
    const token = await db.Token.findOne({where: {userId: user.id}});
    await token.destroy();
  },
};
