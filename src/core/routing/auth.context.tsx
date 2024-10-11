import { createContext, useContext, useState } from 'react';

interface AuthContextProps {
  isAuthenticated: boolean;
  logout: () => void;
  login: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: true,
  logout: function (): void {
    throw new Error('Function not implemented.');
  },
  login: function (): void {
    throw new Error('Function not implemented.');
  },
});

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);
  return <AuthContext.Provider value={{ isAuthenticated, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
