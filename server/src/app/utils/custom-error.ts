export class CustomError extends Error {
    statusCode: number;
    isOperational: boolean;
  
    constructor(message: string, statusCode: number) {
      super(message);
      this.statusCode = statusCode;
      this.isOperational = true;  // Indicating it's a known, operational error (as opposed to unexpected errors)
      
      // Capturing stack trace for debugging purposes
      Error.captureStackTrace(this, this.constructor);
    }
  }
  