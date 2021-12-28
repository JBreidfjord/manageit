import { useEffect, useState } from "react";

import { db } from "../firebase/config";

export const useCollection = <T extends { id: string }>(collection: string) => {
  const [documents, setDocuments] = useState<T[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let ref = db.collection(collection);

    const unsub = ref.onSnapshot(
      (snapshot) => {
        let results: Array<T> = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id } as T);
        });
        setDocuments(results);
        setError("");
      },
      () => {
        setError("Could not fetch data");
      }
    );

    return () => unsub();
  }, [collection]);

  return { documents, error };
};
