import { useEffect, useState } from "react";

import { auth } from "../firebase/config";
import { db } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const { dispatch, user } = useAuthContext();

  const logout = async () => {
    setIsPending(true);
    setError(null);

    try {
      await db.collection("users").doc(user.uid).update({ online: false });

      await auth.signOut();
      dispatch({ type: "LOGOUT" });
      if (!isCancelled) {
        setIsPending(false);
      }
    } catch (err: any) {
      if (!isCancelled) {
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { logout, isPending, error };
};
