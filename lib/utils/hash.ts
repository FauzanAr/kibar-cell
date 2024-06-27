import bcrypt from 'bcryptjs';

export const compareHash = async (password: string, hashedPassword: string) => {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (error) {
    console.error(`Error while comparing password: ${error}`);
    return false;
  }
};