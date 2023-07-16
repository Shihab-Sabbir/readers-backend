import bcrypt from 'bcrypt';

export const isPasswordMatched = async function (
  givenPassword: string,
  DbPassword: string
): Promise<boolean> {
  try {
    console.log({ givenPassword, DbPassword });
    const isPasswordMatch: boolean = await bcrypt.compare(
      givenPassword,
      DbPassword
    );
    return isPasswordMatch;
  } catch (error) {
    console.log(error);
    return false;
  }
};
