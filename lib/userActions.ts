'use server';

import { compareHash } from '../lib/utils/hash';
import getConnection from '../lib/database';
import wrapper from '../lib/utils/wrapper';

export const getUser = async (data: FormData) => {
  try {
    const username = data.get('username') as string;
    const password = data.get('password') as string;
    const connection = getConnection();
    const user = await connection.user.findFirst({where: {username}});
    if (!user) {
      return wrapper.error('User Tidak Ditemukan!');
    }

    const isPasswordMatch = await compareHash(password, user.password);
    if (!isPasswordMatch) {
      return wrapper.error('Password Salah!');
    }

    return wrapper.data(user);
  } catch (error) {
    console.log(`Error while get user ${error}`);
    return wrapper.error('Something went wrong, contact developer!');
  }
};