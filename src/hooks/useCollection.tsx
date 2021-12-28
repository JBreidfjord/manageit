import { useEffect, useState } from "react";

import { db } from "../firebase/config";

export const useCollection = (collection: string) => {
  const [documents, setDocuments] = useState(null as any);
  const [error, setError] = useState("");

  useEffect(() => {
    let ref = db.collection(collection);

    const unsub = ref.onSnapshot(
      (snapshot) => {
        let results: {}[] = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
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
