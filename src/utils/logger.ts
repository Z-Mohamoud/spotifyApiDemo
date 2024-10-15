// src/utils/logger.ts

export const logInfo = (message: string) => {
    console.log(`[INFO]: ${message}`);
  };
  
  export const logError = (message: string, error: any) => {
    console.error(`[ERROR]: ${message}`, error);
  };
  