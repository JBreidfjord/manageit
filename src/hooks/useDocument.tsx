import { useEffect, useState } from "react";

import { db } from "../firebase/config";

export const useDocument = <T extends { id: string }>(collection: string, id: string) => {
  const [document, setDocument] = useState<T>(null as unknown as T);
  const [error, setError] = useState("");

  useEffect(() => {
    const ref = db.collection(collection).doc(id);

    const unsub = ref.onSnapshot(
      (snapshot) => {
        if (snapshot.data()) {
          setDocument({ ...snapshot.data(), id: snapshot.id } as T);
          setError("");
        } else {
          setError("Document does not exist");
        }
      },
      (err) => {
        console.log(err.message);
        setError("Failed to get document");
      }
    );

    return () => unsub();
  }, [collection, id]);

  return { document, error };
};
