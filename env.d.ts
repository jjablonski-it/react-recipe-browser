declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_KEY: string;
      APP_ID: string;
      API_URL: string;
      URI_PREFIX: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
