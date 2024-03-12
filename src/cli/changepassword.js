import {read} from 'read';

import db from '@/models';
import {accountsValidator} from '@/validators';

/**
 * Chnage password
 * @param {string} email
 */
export default async function changepassword(email) {
  const password = await read({prompt: 'Password: '});
  const passwordAgain = await read({prompt: 'Password (again): '});

  try {
    const validatedData = await accountsValidator.changePassword.validateAsync({
      email,
      password,
      passwordAgain,
    });
    const user = await db.User.findOne({where: {email: validatedData.email}});
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
