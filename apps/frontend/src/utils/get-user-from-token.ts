import { jwtDecode } from 'jwt-decode';

// TODO AJUSTAR TYPES
export function getUserFromToken(token: string): any {
  try {
    const tokenWithoutBearer = token.replace('Bearer ', '');
    const decoded = jwtDecode(tokenWithoutBearer);
    return decoded;
  } catch (error) {
    return '';
  }
}
