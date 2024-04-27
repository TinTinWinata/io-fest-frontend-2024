import {
  GoogleAuthProvider,
  User,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IChildren } from '../interfaces/children-interface';
import { useFirebaseApp } from '../utils/firebase';
import { toastSuccess } from '../utils/toast';

interface IUserContext {
  login: () => void;
  logout: () => void;
  user: User | undefined;
}

const userContext = createContext({} as IUserContext);

export function UserProvider({ children }: IChildren) {
  const app = useFirebaseApp();
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);
  const navigate = useNavigate();
  const [user, setUser] = useState<User>();

  const login = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUser(user);
      })
      .catch((error) => {});
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        setUser(undefined);
        toastSuccess('Berhasil logout!');
      })
      .catch((error) => {});
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(undefined);
      }
    });
  }, []);

  const data = { user, login, logout };
  return <userContext.Provider value={data}>{children}</userContext.Provider>;
}

export function useUserAuth() {
  return useContext(userContext);
}
