import 'express';

declare module 'express' {
  export interface Request {
    gateway?: string;
  }
}
