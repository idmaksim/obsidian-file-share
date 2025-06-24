export default () => {
  return {
    credentials: {
      username: process.env.CREDENTIALS_USERNAME,
      password: process.env.CREDENTIALS_PASSWORD,
    },
    accessSecret: process.env.ACCESS_SECRET,
    refreshSecret: process.env.REFRESH_SECRET,
  };
};
