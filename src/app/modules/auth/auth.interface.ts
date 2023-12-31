export type ILogin = {
  phoneNumber: string;
  password: string;
};

export type ILoginResponse = {
  accessToken: string;
  refreshToken?: string;
};

export type IRefreshToken = {
  accessToken: string;
};
