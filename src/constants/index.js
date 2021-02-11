import { getPort } from '../utils';

export const CLIENT_ID = process.env.CLIENT_ID;
export const CLIENT_SECRET = process.env.CLIENT_SECRET;
export const REDIRECT_URL = `http://localhost:${getPort()}/auth/callback`;
export const AUTH_URL = 'https://quire.io/oauth';
export const TOKEN_URL = 'https://quire.io/oauth/token';
export const API_URL = 'https://quire.io/api';
export const ORG_ID = process.env.ORG_ID;
