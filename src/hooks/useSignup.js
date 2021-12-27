import { auth, db, storage } from "../firebase/config";
import { useEffect, useState } from "react";

import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (displayName, email, password, avatar) => {
    setIsPending(true);
    setError(null);

    try {
      const res = await auth.createUserWithEmailAndPassword(email, password);
      if (!res) {
        throw new Error("Could not complete signup");
      }

      const uploadPath = `avatars/${res.user.uid}/${avatar.name}`;
      const photo = await storage.ref(uploadPath).put(avatar);
      const photoURL = await photo.ref.getDownloadURL();

      await res.user.updateProfile({ displayName, photoURL });

      await db.collection("users").doc(res.user.uid).set({ online: true, displayName, photoURL });

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
