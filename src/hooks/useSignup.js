import { useEffect, useState } from "react";

import { auth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (displayName, email, password) => {
    setIsPending(true);
    setError(null);

    try {
      const res = await auth.createUserWithEmailAndPassword(email, password);
      if (!res) {
        throw new Error("Could not complete signup");
      }

      await res.user.updateProfile({ displayName });
      dispatch({ type: "LOGIN", payload: res.user });

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

  return { error, isPending, signup };
};
