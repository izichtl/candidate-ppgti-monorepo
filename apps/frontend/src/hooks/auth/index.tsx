import { jwtDecode } from 'jwt-decode';
import {
  createContext,
  FC,
  PropsWithChildren,
  ReactElement,
  useContext,
  useState,
  useCallback,
} from 'react';
import { useLocation } from 'react-router-dom';

interface IAuthContext {
  accessToken: string;
  setAccessToken: (token: string) => void;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
  getToken: () => string | null;
  getUserFromToken: () => Record<string, any> | null;
}

const AuthContext = createContext<IAuthContext | null>(null);

export const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthContext');
  }
  return context;
};

export const AuthProvider: FC<PropsWithChildren<{}>> = ({
  children,
}): ReactElement => {
  const [accessToken, setAccessToken] = useState<string>(
    localStorage.getItem('userJWT') || '',
  );

  const login = useCallback((token: string): void => {
    console.log('Login token:', token);
    setAccessToken(token);
    localStorage.setItem('userJWT', token);
  }, []);

  const logout = useCallback((): void => {
    setAccessToken('');
    localStorage.removeItem('userJWT');
  }, []);

  const getToken = useCallback((): string | null => {
    return localStorage.getItem('userJWT');
  }, []);

  // const isAuthenticated = (): boolean => {
  //   const token = localStorage.getItem('userJWT');

  //   if (!token || token.trim() === '') {
  //     return false;
  //   }

  //   try {
  //     // Remove "Bearer " prefix if present
  //     const cleanToken = token.replace('Bearer ', '');
  //     const decoded = jwtDecode(cleanToken);

  //     // Check if token is expired
  //     const currentTime = Date.now() / 1000;
  //     if (decoded.exp && decoded.exp < currentTime) {
  //       // Token expired, remove it
  //       localStorage.removeItem('userJWT');
  //       return false;
  //     }

  //     return true;
  //   } catch (error) {
  //     // Invalid token, remove it
  //     localStorage.removeItem('userJWT');
  //     return false;
  //   }
  // };

  const isAuthenticated = (): boolean => {
    const location = useLocation();
    const token = localStorage.getItem('userJWT');
    // console.log('Token:', token);
    // Retorna false se estiver nas páginas de login
    if (
      location.pathname === '/login' ||
      location.pathname === '/comissao/login'
    )
      return false;

    return token !== null;
  };

  const getUserFromToken = useCallback((): Record<string, any> | null => {
    const token = getToken();

    if (!token || token.trim() === '') {
      return null;
    }

    try {
      const cleanToken = token.replace('Bearer ', '');
      const decoded = jwtDecode(cleanToken);
      return decoded;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }, [getToken]);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
        login,
        logout,
        getToken,
        isAuthenticated,
        getUserFromToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
