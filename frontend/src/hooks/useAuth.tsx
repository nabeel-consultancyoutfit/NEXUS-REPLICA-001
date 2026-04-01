
import { useAppDispatch, useAppSelector, persistAuth, clearPersistedAuth } from '@/redux/store';
import {
  setCredentials,
  clearCredentials,
  setAuthLoading,
  setAuthError,
  AuthUser,
} from '@/redux/slices/auth';

interface LoginCredentials {
  email: string;
  password: string;
}

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const isLoading = useAppSelector((state) => state.auth.isLoading);
  const error = useAppSelector((state) => state.auth.error);
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  const login = async (credentials: LoginCredentials) => {
    dispatch(setAuthLoading(true));
    dispatch(setAuthError(null));

    try {
      // Simulate API call with 1 second delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock user data
      const mockUser: AuthUser = {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: credentials.email,
        role: 'user',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      };

      const mockAccessToken = 'mock_access_token_' + Date.now();
      const mockRefreshToken = 'mock_refresh_token_' + Date.now();

      dispatch(
        setCredentials({
          user: mockUser,
          accessToken: mockAccessToken,
          refreshToken: mockRefreshToken,
        })
      );

      persistAuth(mockAccessToken, mockRefreshToken);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Login failed';
      dispatch(setAuthError(errorMessage));
    } finally {
      dispatch(setAuthLoading(false));
    }
  };

  const logout = () => {
    dispatch(clearCredentials());
    clearPersistedAuth();
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    accessToken,
    login,
    logout,
  };
};

export default useAuth;
