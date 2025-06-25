export default () => {
  return {
    credentials: {
      username: process.env.CREDENTIALS_USERNAME,
      password: process.env.CREDENTIALS_PASSWORD,
    },
    accessSecret: process.env.ACCESS_SECRET,
    refreshSecret: process.env.REFRESH_SECRET,
    aws: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
      endpoint: process.env.AWS_ENDPOINT,
      bucket: process.env.AWS_BUCKET_NAME,
    },
  };
};
