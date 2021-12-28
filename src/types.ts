import firebase from "firebase/app";

export interface User {
  uid: string;
  displayName: string;
  photoURL: string;
}

export interface FirestoreUser {
  id: string;
  online?: boolean;
  displayName: string;
  photoURL: string;
}

export interface Project {
  id?: string;
  assignedUsersList: FirestoreUser[];
  category: string;
  comments: Comment[];
  createdAt?: firebase.firestore.Timestamp;
  createdBy: FirestoreUser;
  details: string;
  dueDate: firebase.firestore.Timestamp;
  name: string;
}

export interface Comment {
  content: string;
  createdAt: firebase.firestore.Timestamp;
  displayName: string;
  id: number;
  photoURL: string;
}

export interface ProjectCollection {
  documents: Project[];
  error?: string;
}

export interface UserCollection {
  documents: FirestoreUser[];
  error?: string;
}
