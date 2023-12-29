declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string;
    SECRET_ACCESS_TOKEN: string;
    SECRET_REFRESH_TOKEN: string;
  }
}
