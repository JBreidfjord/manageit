import { createContext, useEffect, useReducer } from "react";

import { auth } from "../firebase/config";
import { User } from "../types";

export interface AuthContextType {
  user: User;
  authIsReady: boolean;
  dispatch: React.Dispatch<any>;
}

interface State {
  user: User;
  authIsReady: boolean;
}

interface Action {
  type: string;
  payload?: any;
}

type Props = {
  children: React.ReactNode;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const authReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    case "AUTH_READY":
      return { ...state, user: action.payload, authIsReady: true };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
  });

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      dispatch({ type: "AUTH_READY", payload: user });
      unsub();
    });
  }, []);

  return <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>;
};
