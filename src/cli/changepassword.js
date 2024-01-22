import mongoose from 'mongoose';
import {read} from 'read';

import {User} from '@/models';
import {accountsValidator} from '@/validators';
import {MONGODB_URI} from '@/settings';

/**
 * Chnage password
 * @param {string} email
 */
export default async function changepassword(email) {
  const password = await read({prompt: 'Email: '});
  const passwordAgain = await read({prompt: 'Password (again): '});

  try {
    const validatedData = await accountsValidator.changePassword.validateAsync({
      email,
      password,
      passwordAgain,
    });
    await mongoose.connect(MONGODB_URI);
    const user = await User.findOne({email: validatedData.email});
    if (!user) {
      console.error(`Error: User '${email}' does not exist.`);
      process.exit(2);
    }
    user.password = validatedData.password;
    await user.save();
  } catch (err) {
    console.error(err);
    process.exit(2);
  }
  console.info(`Password changed successfully for user '${email}'.`);
  process.exit(0);
}
