import { Session } from 'cookie-session';

declare module 'express' {
  interface Request {
    session: Session & {
      isNew?: boolean;
      userid?: string;
    }
  }
}