// eslint-disable-next-line no-unused-vars
declare namespace Express {
  export interface Request {
    userAuth: {
      userId: string;
      company?: string;
      profile: string;
    };
  }
}
