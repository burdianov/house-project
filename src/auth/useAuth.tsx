import {
  createContext,
  FunctionComponent,
  useContext,
  useEffect,
  useState
} from 'react';
import { useRouter } from 'next/router';
import { getAuth, User, signOut, onIdTokenChanged } from 'firebase/auth';

import initFirebase from './initFirebase';
import { removeTokenCookie, setTokenCookie } from './tokenCookies';

initFirebase();

interface IAuthContext {
  user: User | null;
  logout: () => void;
  authenticated: boolean;
}

const AuthContext = createContext<IAuthContext>({
  user: null,
  logout: () => null,
  authenticated: false
});

export const AuthProvider: FunctionComponent = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const auth = getAuth();

  useEffect(() => {
    const cancelAuthListener = onIdTokenChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        setTokenCookie(token);
        setUser(user);
      } else {
        removeTokenCookie();
        setUser(null);
      }
    });

    return () => {
      cancelAuthListener();
    };
  }, [auth]);

  const logout = () => {
    signOut(auth)
      .then(() => {
        router.push('/');
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <AuthContext.Provider value={{ user, logout, authenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
