import {
  createContext,
  useContext,
  Context,
  ReactNode,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";

import { onAuthStateChanged } from "firebase/auth";
import firebase from "../lib/firebase";

export interface User {
  uid: string;
  displayName: string | null;
  email: string | null;
}

interface AuthContextProps {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

export const AuthContext = createContext<AuthContextProps | null>(
  null
) as Context<AuthContextProps>;
export const useAuth = () => useContext(AuthContext);

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebase.auth, (data) => {
      if (data) {
        const _user = {
          uid: data.uid,
          displayName: data.displayName,
          email: data.email,
        };

        setUser(_user);
        return;
      }

      setUser(null);

      return () => {
        unsubscribe();
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
