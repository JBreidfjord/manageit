import { db, timestamp } from "../firebase/config";
import { useEffect, useReducer, useState } from "react";

interface State {
  document: {};
  isPending: boolean;
  error: string;
  success: boolean;
}

interface Action {
  type: string;
  payload?: any;
}

let initialState: State = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "PENDING":
      return { isPending: true, document: null, success: null, error: null };
    case "ADD_DOC":
      return { document: action.payload, isPending: false, error: null, success: true };
    case "DEL_DOC":
      return { document: null, isPending: false, error: null, success: true };
    case "UPDATE_DOC":
      return { document: action.payload, isPending: false, error: null, success: true };
    case "ERROR":
      return { error: action.payload, isPending: false, success: false, document: null };
    default:
      return state;
  }
};

export const useFirestore = (collection: string) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  const ref = db.collection(collection);

  const dispatchIfNotCancelled = (action: Action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  const addDocument = async (doc: {}) => {
    dispatchIfNotCancelled({ type: "PENDING" });

    try {
      const createdAt = timestamp.fromDate(new Date());
      const addedDocument = await ref.add({ ...doc, createdAt });
      dispatchIfNotCancelled({ type: "ADD_DOC", payload: addedDocument });
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
    }
  };

  const deleteDocument = async (id: string) => {
    dispatchIfNotCancelled({ type: "PENDING" });

    try {
      await ref.doc(id).delete();
      dispatchIfNotCancelled({ type: "DEL_DOC" });
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
    }
  };

  const updateDocument = async (id: string, updates: {}) => {
    dispatchIfNotCancelled({ type: "PENDING" });

    try {
      await ref.doc(id).update(updates);
      const updatedDocument = await ref.doc(id).get();
      dispatchIfNotCancelled({ type: "UPDATE_DOC", payload: updatedDocument });
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { addDocument, deleteDocument, updateDocument, response };
};
