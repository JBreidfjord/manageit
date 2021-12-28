import firebase from "firebase/app";

export interface User {
  id: string;
  online?: boolean;
  displayName: string;
  photoURL: string;
}

export interface ProjectType {
  id: string;
  assignedUsersList: User[];
  category: string;
  comments: Comment[];
  createdAt: firebase.firestore.Timestamp;
  createdBy: User;
  details: string;
  dueDate: firebase.firestore.Timestamp;
  name: string;
}

export interface CreateProject {
  assignedUsersList: User[];
  category: string;
  comments: Comment[];
  createdBy: User;
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
