export default () => ({
  APP_NAME: process.env.APP_NAME ?? "nestjs",
  NODE_ENV: process.env.NODE_ENV ?? "development"
})