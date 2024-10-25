import { createContext, useContext, useEffect, useState } from 'react';
import { AuthLocator } from '../di/auth.locator';
import { Credentials } from '../../domain/credentials';
import { AuthError } from '@/core/errors/auth.error';
import { ERROR_CODES } from '@/core/errors/error-codes';
import { User } from '../../domain/user';
import { AuthFirebaseRepository } from '../../infrastructure/auth-firebase.repository';

interface AuthContextProps {
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => Promise<void>;
  login: (credentials: Credentials) => Promise<void>;
  signup: (credentials: Credentials) => Promise<void>;
  refetchUser: () => Promise<void>;
  user?: User;
  errorCode?: string | ERROR_CODES;
}

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  isLoading: false,
  logout: function (): Promise<void> {
    throw new Error('Function not implemented.');
  },
  login: function (): Promise<void> {
    throw new Error('Function not implemented.');
  },
  signup: function (): Promise<void> {
    throw new Error('Function not implemented.');
  },
  refetchUser: function (): Promise<void> {
    throw new Error('Function not implemented.');
  },
});

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [errorCode, setErrorCode] = useState<string | ERROR_CODES | undefined>();

  useEffect(() => {
    new AuthFirebaseRepository().authStateSubscriber((user) => {
      if (!user) {
        setUser(undefined);
        setIsAuthenticated(false);
        setErrorCode(undefined);
        return;
      } else {
        setUser(user);
        setIsAuthenticated(true);
        setErrorCode(undefined);
      }
    });
  }, []);

  const login = async (credentials: Credentials) => {
    setIsLoading(true);
    try {
      const res = await AuthLocator.getLoginCommand().handle(credentials);
      if (res instanceof AuthError) {
        setErrorCode(res.code);
        setUser(undefined);
      } else {
        setIsAuthenticated(true);
        setUser(res);
        setErrorCode(undefined);
      }
      setIsLoading(false);
    } catch (error) {
      setErrorCode(ERROR_CODES.UNKOWN);
      setIsAuthenticated(false);
      setUser(undefined);
      setIsLoading(false);
      return;
    }
  };

  const signup = async (credentials: Credentials) => {
    setIsLoading(true);
    try {
      const res = await AuthLocator.getSignupCommand().handle(credentials);
      if (res instanceof AuthError) {
        setErrorCode(res.code);
        setUser(undefined);
      } else {
        setIsAuthenticated(true);
        setUser(res);
        setErrorCode(undefined);
      }
      setIsLoading(false);
    } catch (error) {
      setErrorCode(ERROR_CODES.UNKOWN);
      setIsAuthenticated(false);
      setUser(undefined);
      setIsLoading(false);
      return;
    }
  };

  const logout = async () => {
    try {
      await AuthLocator.getLogoutCommand().handle();
      setIsAuthenticated(false);
      setUser(undefined);
    } catch (error) {
      console.error(error);
    }
  };

  const refetchUser = async () => {
    if (!user) return;
    const res = await AuthLocator.getFindUserByIdQuery().handle(user.uid);
    setUser(res);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, errorCode, user, isLoading, refetchUser, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
