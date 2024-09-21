declare namespace NodeJS {
  interface ProcessEnv {
    MONGO_URI: string;
    PORT?: string;
    JWT_SECRET: string;
  }
}
