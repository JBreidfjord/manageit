import { auth, db } from "../firebase/config";
import { useEffect, useState } from "react";

import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email: string, password: string) => {
    setIsPending(true);
    setError(null);

    try {
      const res = await auth.signInWithEmailAndPassword(email, password);

      await db.collection("users").doc(res.user.uid).update({ online: true });

      await dispatch({ type: "LOGIN", payload: res.user });
      if (!isCancelled) {
        setIsPending(false);
      }
    } catch (err) {
      if (!isCancelled) {
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { login, isPending, error };
};
